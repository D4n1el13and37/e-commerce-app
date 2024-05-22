import {
  ClientBuilder,
  AnonymousAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';
import {
  projectKey,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './clientConfig';

// Create base client
const createBaseClient = () =>
  new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions);
// .withLoggerMiddleware();

export const createDefaultClient = (): ApiRoot => {
  const client = createBaseClient().build();
  return createApiBuilderFromCtpClient(client);
};

// Anonymous client
export const createAnonymousClient = (): ApiRoot => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: authMiddlewareOptions.host,
    projectKey,
    credentials: authMiddlewareOptions.credentials,
    scopes: authMiddlewareOptions.scopes,
    tokenCache: {
      get: () => JSON.parse(localStorage.getItem('tokendata')!) as TokenStore,
      set: (value: TokenStore) =>
        localStorage.setItem('tokendata', JSON.stringify(value)),
    },
    fetch,
  };

  const client = createBaseClient().withAnonymousSessionFlow(options).build();

  return createApiBuilderFromCtpClient(client);
};

// Client with Password
export const createPasswordClient = (
  email: string,
  password: string
): ApiRoot => {
  const options: PasswordAuthMiddlewareOptions = {
    host: authMiddlewareOptions.host,
    projectKey,
    credentials: {
      clientId: authMiddlewareOptions.credentials.clientId,
      clientSecret: authMiddlewareOptions.credentials.clientSecret,
      user: {
        username: email,
        password,
      },
    },
    tokenCache: {
      get: () => JSON.parse(localStorage.getItem('tokendata')!) as TokenStore,
      set: (value: TokenStore) =>
        localStorage.setItem('tokendata', JSON.stringify(value)),
    },
    scopes: authMiddlewareOptions.scopes,
    fetch,
  };

  const client = createBaseClient().withPasswordFlow(options).build();

  return createApiBuilderFromCtpClient(client);
};

// Token client
export const createTokenClient = (token: string): ApiRoot => {
  const options: RefreshAuthMiddlewareOptions = {
    host: authMiddlewareOptions.host,
    projectKey,
    credentials: authMiddlewareOptions.credentials,
    refreshToken: token,
    tokenCache: {
      get: () => JSON.parse(localStorage.getItem('tokendata')!) as TokenStore,
      set: (value: TokenStore) =>
        localStorage.setItem('tokendata', JSON.stringify(value)),
    },
    fetch,
  };

  const client = createBaseClient().withRefreshTokenFlow(options).build();

  return createApiBuilderFromCtpClient(client);
};
