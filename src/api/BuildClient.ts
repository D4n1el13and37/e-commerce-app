import fetch from 'node-fetch';

import {
  ClientBuilder,
  createHttpClient,
  createClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const projectKey = 'yes-to-plants';
const clientId = 'Qk9DVzS_Wl01PGjWViCUPII9';
const clientSecret = 'itkhP2kwM2U8QwgdAtMVg5p89YiWJzRW';
const region = 'europe-west1.gcp';
const scopes = ['manage_project:yes-to-plants'];

function getClient() {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: process.env.CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: process.env.CTP_API_URL,
    fetch,
  });

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });

  return client;
}

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${region}.commercetools.com`,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${region}.commercetools.com`,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
