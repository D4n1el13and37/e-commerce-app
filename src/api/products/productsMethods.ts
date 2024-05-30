import {
  ProductPagedQueryResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';

export async function getProducts(): Promise<ProductPagedQueryResponse> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .products()
      .get()
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function getProduct(ID: string): Promise<ProductProjection> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .withId({ ID })
      .get()
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}
