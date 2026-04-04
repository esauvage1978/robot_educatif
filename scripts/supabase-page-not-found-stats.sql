-- Archives des URL en erreur 404 (agrégat par chemin demandé).
-- À exécuter dans Supabase → SQL Editor après scripts/supabase-page-path-stats.sql (même projet, clé anon).
--
-- RLS désactivée (même motif que page_path_stats) : INSERT via RPC sans conflit PostgREST/RLS.
-- anon/authenticated : SELECT uniquement ; pas de GRANT INSERT anon.

create table if not exists public.page_not_found_stats (
	requested_path text primary key,
	hits int not null default 0,
	first_seen timestamptz not null default now(),
	last_seen timestamptz not null default now()
);

drop policy if exists "page_not_found_stats_select" on public.page_not_found_stats;
drop policy if exists "page_not_found_stats_maintain_postgres" on public.page_not_found_stats;
drop policy if exists "page_not_found_stats_maintain_supabase_admin" on public.page_not_found_stats;
alter table public.page_not_found_stats disable row level security;

grant select on public.page_not_found_stats to anon;
grant select on public.page_not_found_stats to authenticated;
revoke insert, update, delete on public.page_not_found_stats from anon;
revoke insert, update, delete on public.page_not_found_stats from authenticated;

grant insert, update, delete on public.page_not_found_stats to postgres;

create or replace function public.increment_page_not_found(p_requested_path text)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
	v int;
	p text;
begin
	if p_requested_path is null then
		raise exception 'invalid path';
	end if;
	p := left(trim(p_requested_path), 512);
	if length(p) = 0 then
		raise exception 'invalid path';
	end if;
	if position(E'\n' in p) > 0 or position(E'\r' in p) > 0 then
		raise exception 'invalid path';
	end if;
	if p not like '/%' or p like '%..%' then
		raise exception 'invalid path';
	end if;

	insert into public.page_not_found_stats (requested_path, hits, first_seen, last_seen)
	values (p, 1, now(), now())
	on conflict (requested_path) do update
	set
		hits = public.page_not_found_stats.hits + 1,
		last_seen = now()
	returning hits into v;

	return v;
end;
$$;

grant execute on function public.increment_page_not_found(text) to anon, authenticated;

-- Lecture :
--   select * from page_not_found_stats order by hits desc, last_seen desc;
