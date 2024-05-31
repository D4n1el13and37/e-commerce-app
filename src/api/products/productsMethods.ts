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
      throw new Error('Error during login via');
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
      throw new Error('Error during login via');
    }
  }
}

interface FilterValue {
  size: string;
  careLevel: string;
  lightRequirement: string;
  priceRange: number[];
}

export async function getCardsByFilters(
  filters: FilterValue
): Promise<ProductProjectionPagedSearchResponse> {
  const { size, careLevel, lightRequirement, priceRange } = filters;
  let filterQuery = '';

  if (size) {
    filterQuery += `&filter.query.attributes.size.key="${size}"`;
  }
  if (careLevel) {
    filterQuery += `&filter.query.attributes.careLevel.key="${careLevel}"`;
  }
  if (lightRequirement) {
    filterQuery += `&filter.query.attributes.lightRequirement.key="${lightRequirement}"`;
  }
  if (priceRange) {
    const [min, max] = priceRange;
    filterQuery += `&filter.query.price.centAmount:range(${min},${max || '*'})`;
  }

  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({ queryArgs: { filter: filterQuery } })
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
