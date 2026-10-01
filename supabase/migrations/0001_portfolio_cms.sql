-- Portfolio Control Center: content documents, admin allowlist, certificate storage.
-- Run once in the Supabase SQL editor (safe to re-run), then run supabase/seed.sql.

-- ---------------------------------------------------------------------------
-- Content: one row per editable document. `data` holds exactly the shape of
-- PortfolioDocuments[key] from content/documents.ts.
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_documents (
  key text primary key check (key in (
    'profile', 'about', 'education', 'skills', 'certifications', 'ctf',
    'tools', 'blog', 'projects', 'apps', 'commands', 'settings'
  )),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

-- Admins are listed here by auth user id. Managed from the SQL editor only.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Security definer so policies can consult admin_users without exposing it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.touch_portfolio_document()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists portfolio_documents_touch on public.portfolio_documents;
create trigger portfolio_documents_touch
  before insert or update on public.portfolio_documents
  for each row execute function public.touch_portfolio_document();

-- ---------------------------------------------------------------------------
-- Row Level Security: everyone may read content; only admins may write it.
-- ---------------------------------------------------------------------------
alter table public.portfolio_documents enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Portfolio documents are public" on public.portfolio_documents;
create policy "Portfolio documents are public"
  on public.portfolio_documents for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins insert portfolio documents" on public.portfolio_documents;
create policy "Admins insert portfolio documents"
  on public.portfolio_documents for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins update portfolio documents" on public.portfolio_documents;
create policy "Admins update portfolio documents"
  on public.portfolio_documents for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins delete portfolio documents" on public.portfolio_documents;
create policy "Admins delete portfolio documents"
  on public.portfolio_documents for delete
  to authenticated
  using ((select public.is_admin()));

drop policy if exists "Users see their own admin row" on public.admin_users;
create policy "Users see their own admin row"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

-- Defense in depth on top of RLS: the anon role can never write content, and
-- nobody but the database owner can change the admin list.
revoke insert, update, delete on public.portfolio_documents from anon;
revoke insert, update, delete on public.admin_users from anon, authenticated;
grant select on public.portfolio_documents to anon, authenticated;
grant insert, update, delete on public.portfolio_documents to authenticated;
grant select on public.admin_users to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: public certificate images, writable by admins only.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('certificates', 'certificates', true, 5242880, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public URLs need no policy (the bucket is public). Admins additionally need
-- select so the dashboard can delete replaced images (remove = select + delete).
drop policy if exists "Admins read certificate objects" on storage.objects;
create policy "Admins read certificate objects"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'certificates' and (select public.is_admin()));

drop policy if exists "Admins upload certificate images" on storage.objects;
create policy "Admins upload certificate images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'certificates' and (select public.is_admin()));

drop policy if exists "Admins update certificate images" on storage.objects;
create policy "Admins update certificate images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'certificates' and (select public.is_admin()))
  with check (bucket_id = 'certificates' and (select public.is_admin()));

drop policy if exists "Admins delete certificate images" on storage.objects;
create policy "Admins delete certificate images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'certificates' and (select public.is_admin()));
