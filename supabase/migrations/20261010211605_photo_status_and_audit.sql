-- 1. photos: status, error, cloudinary_public_id, created_at, created_by
--    status must be NOT NULL, only allow 'pending' or 'published',
--    and existing rows must become 'published'.
alter table public.photos
    add column status text not null default 'published' check ( status in ('pending','published') ),
    add column error text,
    add column cloudinary_public_id text,
    add column created_at timestamptz not null default now(),
    add column created_by uuid default auth.uid()
;


-- 2. From now on, new photos start as 'pending'.
alter table public.photos
    alter column status set default 'pending';

-- 3. places and visits get created_at and created_by too.
alter table public.places
    add column created_at timestamptz not null default now(),
    add column created_by uuid default auth.uid();

alter table public.visits
    add column created_at timestamptz not null default now(),
    add column created_by uuid default auth.uid();

-- 4. Backfill cloudinary_public_id for existing photos.
--    Existing URLs look like:
--    https://res.cloudinary.com/dhjvcitdm/image/upload/f_auto,q_auto/photo-map/uk/uk-london/DSCF1910
--    The public id is everything after "f_auto,q_auto/".
--    Skip URLs containing '%' (encoded characters); leave those null.
update public.photos
set cloudinary_public_id = regexp_replace(url, '^https://res\.cloudinary\.com/[^/]+/image/upload/f_auto,q_auto/', '')
where url ~ '^https://res\.cloudinary\.com/[^/]+/image/upload/f_auto,q_auto/'
  and url !~ '%'
;