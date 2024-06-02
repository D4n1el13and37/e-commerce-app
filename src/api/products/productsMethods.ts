import {
  CategoryPagedQueryResponse,
  ProductPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
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
      throw new Error('Unknown Error during get products');
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
      throw new Error('Unknown Error during get one product');
    }
  }
}

export async function getCategories(): Promise<CategoryPagedQueryResponse> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .categories()
      .get()
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown Error while fetch categories');
    }
  }
}

export async function getCardsByCategory(
  id: string
): Promise<ProductProjectionPagedSearchResponse> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({ queryArgs: { filter: [`categories.id:"${id}"`] } })
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown Error while fetch products by category');
    }
  }
}
