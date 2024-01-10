import { initBaseAuth } from "@propelauth/node";

export const propelauth = initBaseAuth({
  // You can find these fields under the Backend Integration section for your project in PropelAuth.
  authUrl: process.env.PROPELAUTH_AUTH_URL,
  apiKey: process.env.PROPELAUTH_API_KEY,
  manualTokenVerificationMetadata: {
    verifierKey: process.env.PROPELAUTH_VERIFIER_KEY,
    issuer: process.env.PROPELAUTH_ISSUER_URL,
  },
});
