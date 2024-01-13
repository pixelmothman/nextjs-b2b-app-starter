A starter template that uses NextJS, TailwindCSS, PropelAuth, and Supabase.

## Getting Started with NextJS Starter

Create a .env.local file and add the following env variables:
- NEXT_PUBLIC_AUTH_URL=''
- PROPELAUTH_API_KEY=''
- PROPELAUTH_VERIFIER_KEY=''
- PROPELAUTH_REDIRECT_URI='http://localhost:3000/api/auth/callback'
- SUPABASE_URL=''
- SUPABASE_SERVICE_KEY=''
- SVIX_WEBHOOK_NEW_ORG=''
- SVIX_WEBHOOK_DEL_ORG=''
- SVIX_WEBHOOK_MOD_ORG=''
- SVIX_WEBHOOK_NEW_USER=''
- SVIX_WEBHOOK_DEL_USER=''
- SVIX_WEBHOOK_MOD_USER=''

## In Propelauth

In the frontend integration section of PropelAuth dashboard:
- Default redirect path after login: /api/auth/callback
- Default redirect path after logout: /api/auth/logout

## In Supabase

Create a new database with the following tables (for the example):
- Organizations

    create table
    public.org_table (
        org_id uuid not null,
        org_name text not null default 'Example Org'::text,
        org_users smallint not null default '1'::smallint,
        created_at timestamp with time zone not null default now(),
        constraint org_table_pkey primary key (org_id),
        constraint org_table_org_id_key unique (org_id)
    ) tablespace pg_default;

- Users

    create table
    public.user_table (
        user_id uuid not null,
        org_id uuid not null,
        user_name text not null,
        user_email text not null,
        user_role text not null,
        created_at timestamp with time zone not null default now(),
        constraint user_table_pkey primary key (user_id),
        constraint user_table_org_id_fkey foreign key (org_id) references org_table (org_id) on update cascade on delete cascade
    ) tablespace pg_default;

- Favorite Movies

    create table
    public.fav_movies_table (
        id bigint generated by default as identity,
        org_id uuid not null,
        user_id uuid not null,
        movie_name text not null,
        created_at timestamp with time zone not null default now(),
        constraint fav_movies_table_pkey primary key (id),
        constraint fav_movies_table_org_id_fkey foreign key (org_id) references org_table (org_id) on update cascade on delete cascade,
        constraint fav_movies_table_user_id_fkey foreign key (user_id) references user_table (user_id) on update cascade on delete cascade
    ) tablespace pg_default;

- Organizations to be deleted (for cron jobs)

    create table
    public.org_to_delete_table (
        org_id uuid not null,
        user_id uuid null,
        created_at timestamp with time zone not null default now(),
        constraint org_to_delete_table_pkey primary key (org_id),
        constraint org_to_delete_table_org_id_fkey foreign key (org_id) references org_table (org_id) on delete cascade,
        constraint org_to_delete_table_user_id_fkey foreign key (user_id) references user_table (user_id)
    ) tablespace pg_default;

## Add user and org

While in dev mode just manually add to supabase.

## When in production

## In Propelauth

In the frontend integration section of PropelAuth dashboard:
- Application URL: your app url.

## SVIX

In PropelAuth go to webhooks, open SVIX, and create 6 webhooks for:
- New organization
- New user
- Org updated
- User updated
- Org deleted
- User deleted

In order to use it you'll need an "Endpoint URL" to point to. In this case is the url you obtain from vercel followed by the corresponding route.