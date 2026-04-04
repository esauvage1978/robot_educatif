-- Compteur de vues par chemin de page (hors articles blog : le footer n’envoie pas le tracker sur les articles,
-- où les vues restent portées par article_engagement / visit_and_get_stats).
-- Référents : clé « source / support » (style GA), ex. google / organic, fr.search.yahoo.com / referral,
-- (direct) / (none). Anciennes valeurs https://hôte encore acceptées pour compatibilité.
-- À exécuter dans Supabase → SQL Editor après scripts/supabase-article-engagement.sql (même projet, mêmes clés anon).
--
-- RLS désactivée sur ces agrégats : avec RLS activée, PostgREST / rôle effectif sur Supabase provoquait des HTTP 500
-- (error=54000) malgré SECURITY DEFINER. Sécurité : anon/authenticated n’ont que SELECT ; écriture via RPC uniquement.
-- Le Security Advisor peut alerter « RLS disabled » — acceptable pour des totaux non sensibles.

create table if not exists public.page_path_stats (
	path text primary key,
	views int not null default 0
);

drop policy if exists "page_path_stats_select" on public.page_path_stats;
drop policy if exists "page_path_stats_maintain_postgres" on public.page_path_stats;
drop policy if exists "page_path_stats_maintain_supabase_admin" on public.page_path_stats;
alter table public.page_path_stats disable row level security;

create table if not exists public.page_referral_stats (
	path text not null,
	referrer_origin text not null,
	views int not null default 0,
	primary key (path, referrer_origin)
);

drop policy if exists "page_referral_stats_select" on public.page_referral_stats;
drop policy if exists "page_referral_stats_maintain_postgres" on public.page_referral_stats;
drop policy if exists "page_referral_stats_maintain_supabase_admin" on public.page_referral_stats;
alter table public.page_referral_stats disable row level security;

grant select on public.page_path_stats to anon;
grant select on public.page_path_stats to authenticated;
grant select on public.page_referral_stats to anon;
grant select on public.page_referral_stats to authenticated;
revoke insert, update, delete on public.page_path_stats from anon;
revoke insert, update, delete on public.page_path_stats from authenticated;
revoke insert, update, delete on public.page_referral_stats from anon;
revoke insert, update, delete on public.page_referral_stats from authenticated;

grant insert, update, delete on public.page_path_stats to postgres;
grant insert, update, delete on public.page_referral_stats to postgres;

drop function if exists public.increment_page_path_view(text);

create or replace function public.increment_page_path_view(p_path text, p_referrer_origin text default null)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
	v int;
	p text;
	ro text;
	parts text[];
begin
	if p_path is null then
		raise exception 'invalid path';
	end if;
	p := left(trim(p_path), 512);
	if length(p) = 0 then
		raise exception 'invalid path';
	end if;

	ro := lower(trim(coalesce(p_referrer_origin, '')));
	if ro = '' or ro = 'direct' then
		ro := '(direct) / (none)';
	elsif ro = 'internal' then
		ro := '(internal) / (internal)';
	elsif ro = 'invalid' then
		ro := 'invalid / (none)';
	end if;

	if position(E'\n' in ro) > 0 or position(E'\r' in ro) > 0 then
		ro := regexp_replace(ro, E'[\n\r]+', ' ', 'g');
	end if;
	if length(ro) > 220 then
		ro := left(ro, 220);
	end if;
	if length(trim(ro)) = 0 then
		ro := '(direct) / (none)';
	end if;

	if ro ~ '^https?://[^/\s]+/?$' then
		null;
	elsif strpos(ro, ' / ') > 0 then
		parts := string_to_array(ro, ' / ');
		if array_length(parts, 1) is distinct from 2
			or length(trim(parts[1])) = 0
			or length(trim(parts[2])) = 0 then
			ro := '(unparsed) / (referral)';
		end if;
	else
		ro := '(unparsed) / (referral)';
	end if;

	insert into public.page_path_stats (path, views)
	values (p, 1)
	on conflict (path) do update
	set views = public.page_path_stats.views + 1
	returning views into v;

	insert into public.page_referral_stats (path, referrer_origin, views)
	values (p, ro, 1)
	on conflict (path, referrer_origin) do update
	set views = public.page_referral_stats.views + 1;

	return v;
end;
$$;

grant execute on function public.increment_page_path_view(text, text) to anon, authenticated;

-- Lecture :
--   select * from page_path_stats order by views desc;
--   select * from page_referral_stats order by views desc;
--   select * from page_referral_stats where path = '/contact/' order by views desc;
