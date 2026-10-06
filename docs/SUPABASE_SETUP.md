# Supabase setup (one time)

The portfolio runs without Supabase (it serves the static defaults in `content/`).
These steps turn on the admin dashboard at `/admin`. Plan for about 15 minutes.

## 1. Create the project

1. Create a free project at [supabase.com](https://supabase.com).
2. Project Settings → API Keys: copy the **Project URL** and the **publishable key**
   (`sb_publishable_...`). Do not create or copy a secret key (`sb_secret_...`):
   every write goes through your signed-in session and Row Level Security.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
ADMIN_EMAILS=<the email you will sign in with>
```

Add the same three variables in Vercel → Project → Settings → Environment Variables,
then redeploy.

## 3. Create the schema and seed the content

In the Supabase dashboard → SQL Editor, run, in order:

1. `supabase/migrations/0001_portfolio_cms.sql` — tables, RLS policies, `is_admin()`,
   and the public `certificates` storage bucket with admin-only write policies.
2. `supabase/seed.sql` — inserts the current portfolio content (one row per document).
   It never overwrites existing rows, so it is safe to re-run.

## 4. Lock down sign-ups

Authentication → Sign In / Providers → Email: turn **off** "Allow new users to sign up".
(Even if someone signs up, they cannot write: they are neither in `ADMIN_EMAILS` nor in
`admin_users`.)

## 5. Create your admin account

1. Authentication → Users → **Add user** → "Create new user": your email + a strong
   password, tick **Auto Confirm User**.
2. SQL Editor — grant it admin rights (use the same email):

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict do nothing;
   ```

## 6. Sign in

Open `/admin/login` (locally `http://localhost:3000/admin/login`) and sign in.
Saving a section updates the public desktop immediately (the cached content is
revalidated on every save).

## How access is enforced

1. Middleware redirects anyone without an allowed session away from `/admin`.
2. Every admin page and server action re-checks the session with Supabase Auth and
   `ADMIN_EMAILS`.
3. Postgres Row Level Security only accepts writes from users in `admin_users`;
   storage policies do the same for certificate images.

## Maintenance

- **Regenerate the seed** after changing defaults in `content/*.ts`:
  `npm run seed:sql` (then re-run `supabase/seed.sql`; existing rows are kept).
- **Reset one section to its default**: in `seed.sql`, change that statement's
  `on conflict (key) do nothing` to `on conflict (key) do update set data = excluded.data`
  and run just that statement.
- **Remove an admin**: `delete from public.admin_users where user_id = '<uuid>';`
  and remove the email from `ADMIN_EMAILS`.
