import {
  createAnonymousClient,
  createPasswordClient,
  createTokenClient,
} from './clientBuilder';

type ClientType = 'anonymous' | 'password' | 'token';

const getApiRoot = (
  type: ClientType,
  params: { token?: string; email?: string; password?: string } = {}
) => {
  switch (type) {
    case 'anonymous':
      return createAnonymousClient();
    case 'password':
      if (params.email && params.password) {
        return createPasswordClient(params.email, params.password);
      }
      return createAnonymousClient();
    case 'token':
      if (params.token) {
        return createTokenClient(params.token);
      }
      return createAnonymousClient();
    default:
      throw new Error('Unsupported client type');
  }
};

export default getApiRoot;
