import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

export const projectKey = import.meta.env.VITE_PROJECT_KEY || '';
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com', // where we send auth
  projectKey, // it's from .env file
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`], // here we choose which permission we want to get
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  // where we send auth - if it is the same mb we create an .env host name?
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const client: Client = new ClientBuilder() // as i understande here we crreate a client
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot: () => ApiRoot = () =>
  createApiBuilderFromCtpClient(client);
