import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';
// import useAppSelector from '../../hooks/useAppSelector';

// const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

export async function getProducts(): Promise<ProductPagedQueryResponse> {
  try {
    // const client = isAuthorized ? 'token' : 'anonymous';
    // const token = JSON.parse(localStorage.getItem('tokendata') || '');
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .products()
      .get()
      .execute();

    // console.log(JSON.stringify(res));
    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function g() {
  return 'console';
}
