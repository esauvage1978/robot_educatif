-- À exécuter dans Supabase : SQL Editor (nouveau projet → Project Settings → API pour URL et clé anon).
-- Table + fonctions sécurisées (RLS : lecture publique, écriture uniquement via RPC).

create table if not exists public.article_engagement (
	slug text primary key,
	views int not null default 0,
	rating_sum bigint not null default 0,
	rating_count int not null default 0
);

alter table public.article_engagement enable row level security;

drop policy if exists "article_engagement_select" on public.article_engagement;
create policy "article_engagement_select" on public.article_engagement for select using (true);

-- Incrémente une vue et renvoie les stats à jour (un appel au chargement de l’article).
create or replace function public.visit_and_get_stats(p_slug text)
returns table (views int, rating_sum bigint, rating_count int)
language plpgsql
security definer
set search_path = public
as $$
begin
	insert into public.article_engagement (slug, views)
	values (p_slug, 1)
	on conflict (slug) do update
	set views = public.article_engagement.views + 1;

	return query
	select e.views, e.rating_sum, e.rating_count
	from public.article_engagement e
	where e.slug = p_slug;
end;
$$;

grant execute on function public.visit_and_get_stats(text) to anon, authenticated;

-- Ajoute une note (1–5). Les vues ne sont pas modifiées.
create or replace function public.submit_article_rating(p_slug text, p_stars int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
	if p_stars < 1 or p_stars > 5 then
		raise exception 'invalid stars';
	end if;

	insert into public.article_engagement (slug, views, rating_sum, rating_count)
	values (p_slug, 0, p_stars, 1)
	on conflict (slug) do update
	set
		rating_sum = public.article_engagement.rating_sum + p_stars,
		rating_count = public.article_engagement.rating_count + 1;
end;
$$;

grant execute on function public.submit_article_rating(text, int) to anon, authenticated;

-- Tableau de bord vues / notes (page Astro statique, noindex, hors sitemap) : /stats-articles-interne/
-- Lecture : GET /rest/v1/article_engagement (policy select true — ne pas diffuser l’URL publiquement).
--
-- Vues des autres pages (accueil, contact, etc.) : exécuter aussi scripts/supabase-page-path-stats.sql
