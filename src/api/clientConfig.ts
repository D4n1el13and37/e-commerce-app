import {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const projectKey = 'yes-to-plants';
export const authHost = 'https://auth.europe-west1.gcp.commercetools.com';
export const apiHost = 'https://api.europe-west1.gcp.commercetools.com';
export const clientId = import.meta.env.VITE_CLIENT_ID || '';
export const clientSecret = import.meta.env.VITE_CLIENT_SECRET || '';
export const scopes = [import.meta.env.VITE_SCOPES];

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authHost,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiHost,
  fetch,
};
