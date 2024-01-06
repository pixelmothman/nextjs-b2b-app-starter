A starter template that uses NextJS, TailwindCSS, PropelAuth, and Supabase.

## Getting Started with NextJS Starter

Create a .env.local file and add the following env variables:
- NEXT_PUBLIC_AUTH_URL=''
- PROPELAUTH_API_KEY=''
- PROPELAUTH_VERIFIER_KEY=''
- PROPELAUTH_REDIRECT_URI='http://localhost:3000/api/auth/callback'
- SUPABASE_URL=''
- SUPABASE_SERVICE_KEY=''

## In Propelauth

In the frontend integration:
- Default redirect path after login: /api/auth/callback
- Default redirect path after logout: /api/auth/logout