-- 1. The admin list.
create table public.admin_users (
    user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security ;

revoke all on public.admin_users from anon, authenticated;

-- 2. is_admin(): true when the logged-in user is in admin_users.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1 from public.admin_users where user_id = auth.uid()
    );
$$;

-- 3. Visitors (anon) may only read published photos.
--    The baseline has a policy named "public read photos" that allows everything. Replace it.
-- TODO: drop the old policy
-- TODO: create policy "public read published photos" on public.photos
--       for select to anon using (...)
drop policy "public read photos" on public.photos;
create policy "public read published photos" on public.photos for select to anon using (status = 'published');


-- 4. The admin may do everything on all three tables.
--    One policy per table: for all, to authenticated, using is_admin(), with check is_admin().
-- TODO: photos
-- TODO: places
-- TODO: visits
create policy "admin all photos" on public.photos for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all places" on public.places for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all visits" on public.visits for all to authenticated using (public.is_admin()) with check (public.is_admin());
-- 5. Defense in depth: take write permissions away from anon entirely,
--    and TRUNCATE (which RLS doesn't cover) from authenticated.
-- TODO: revoke insert, update, delete, truncate ... from anon
-- TODO: revoke truncate ... from authenticated
revoke insert, update, delete, truncate on public.photos, public.places, public.visits from anon;
revoke truncate on public.photos,public.places,public.visits from authenticated;
