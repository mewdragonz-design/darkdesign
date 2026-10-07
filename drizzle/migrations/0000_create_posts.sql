create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text,
  content text,
  hero_image text,
  is_highlight boolean not null default false,
  demo_path text,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Slug generation trigger (reuses existing generate_slug function)
create or replace function public.set_post_slug()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := public.generate_slug(new.title);
  end if;
  return new;
end;
$$;

create trigger posts_set_slug
  before insert or update on public.posts
  for each row execute function public.set_post_slug();

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at_column();

-- Grants
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
grant select on public.posts to anon;

-- RLS
alter table public.posts enable row level security;

create policy "Anyone can view visible posts"
  on public.posts for select to public
  using (is_visible = true);

create policy "Admins can view all posts"
  on public.posts for select to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

create policy "Admins can create posts"
  on public.posts for insert to authenticated
  with check (has_role(auth.uid(), 'admin'::app_role));

create policy "Admins can update posts"
  on public.posts for update to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

create policy "Admins can delete posts"
  on public.posts for delete to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));