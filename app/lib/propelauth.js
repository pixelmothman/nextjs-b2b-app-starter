import { initBaseAuth } from "@propelauth/node";

export const propelauth = initBaseAuth({
  // You can find these fields under the Backend Integration section for your project in PropelAuth.
  authUrl: process.env.NEXT_PUBLIC_AUTH_URL,
  apiKey: process.env.PROPELAUTH_API_KEY
});
