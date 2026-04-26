-- Migration : anti-abus sur les notes d’articles (RPC submit_article_rating).
-- À exécuter dans Supabase SQL Editor APRÈS scripts/supabase-article-engagement.sql
--
-- Remplace l’ancienne fonction à 2 arguments par une version à 3 arguments
-- (p_client_fingerprint : UUID côté navigateur, stocké en localStorage).

-- Journal des votes (audit + limitation) — pas d’accès direct anon (RLS + pas de policy insert public)
create table if not exists public.article_rating_events (
	id bigserial primary key,
	slug text not null,
	client_fingerprint text not null,
	stars int not null check (stars >= 1 and stars <= 5),
	created_at timestamptz not null default now()
);

create unique index if not exists uq_article_rating_events_slug_fingerprint
	on public.article_rating_events (slug, client_fingerprint);

create index if not exists idx_article_rating_events_fp_created
	on public.article_rating_events (client_fingerprint, created_at desc);

alter table public.article_rating_events enable row level security;

-- Pas de policy INSERT/SELECT pour anon : lecture réservée au dashboard (service role) si besoin

drop function if exists public.submit_article_rating(text, int);

create or replace function public.submit_article_rating(
	p_slug text,
	p_stars int,
	p_client_fingerprint text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
	n_last_min int;
	n_last_hour int;
	n_last_day int;
	last_any timestamptz;
begin
	if p_stars < 1 or p_stars > 5 then
		raise exception 'invalid_stars';
	end if;

	if p_slug is null or length(trim(p_slug)) < 1 or length(p_slug) > 512 then
		raise exception 'invalid_slug';
	end if;

	-- UUID (36 caractères) — le client envoie crypto.randomUUID()
	if p_client_fingerprint is null
		or length(p_client_fingerprint) <> 36
		or p_client_fingerprint !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' then
		raise exception 'invalid_fingerprint';
	end if;

	-- Déjà noté cet article avec cet appareil
	if exists (
		select 1
		from public.article_rating_events e
		where e.slug = p_slug and e.client_fingerprint = p_client_fingerprint
	) then
		raise exception 'already_voted';
	end if;

	-- Délai minimum entre deux votes (tous articles confondus), même fingerprint
	select max(e.created_at) into last_any
	from public.article_rating_events e
	where e.client_fingerprint = p_client_fingerprint;

	if last_any is not null and last_any > now() - interval '8 seconds' then
		raise exception 'rate_limit_cooldown';
	end if;

	select count(*)::int into n_last_min
	from public.article_rating_events e
	where e.client_fingerprint = p_client_fingerprint
		and e.created_at > now() - interval '1 minute';

	if n_last_min >= 5 then
		raise exception 'rate_limit_minute';
	end if;

	select count(*)::int into n_last_hour
	from public.article_rating_events e
	where e.client_fingerprint = p_client_fingerprint
		and e.created_at > now() - interval '1 hour';

	if n_last_hour >= 40 then
		raise exception 'rate_limit_hour';
	end if;

	select count(*)::int into n_last_day
	from public.article_rating_events e
	where e.client_fingerprint = p_client_fingerprint
		and e.created_at > now() - interval '24 hours';

	if n_last_day >= 80 then
		raise exception 'rate_limit_day';
	end if;

	insert into public.article_engagement (slug, views, rating_sum, rating_count)
	values (p_slug, 0, p_stars, 1)
	on conflict (slug) do update
	set
		rating_sum = public.article_engagement.rating_sum + p_stars,
		rating_count = public.article_engagement.rating_count + 1;

	insert into public.article_rating_events (slug, client_fingerprint, stars)
	values (p_slug, p_client_fingerprint, p_stars);
end;
$$;

grant execute on function public.submit_article_rating(text, int, text) to anon, authenticated;
