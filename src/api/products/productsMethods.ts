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

export interface FilterValue {
  size: string[];
  careLevel: string[];
  lightRequirement: string[];
  // priceRange: [number, number];
}

export async function getCardsByFilters(
  filters: FilterValue
): Promise<ProductProjectionPagedSearchResponse> {
  const { size, careLevel, lightRequirement } = filters;

  // Создаем массив фильтровых запросов
  const filterQueries: string[] = [];

  if (size.length > 0) {
    size.forEach((s) => {
      filterQueries.push(`variants.attributes.size.key:"${s}"`);
    });
  }
  if (careLevel.length > 0) {
    careLevel.forEach((cl) => {
      filterQueries.push(`variants.attributes.careLevel.key:"${cl}"`);
    });
  }
  if (lightRequirement.length > 0) {
    lightRequirement.forEach((lr) => {
      filterQueries.push(`variants.attributes.lightRequirement.key:"${lr}"`);
    });
  }

  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filterQueries,
        },
      })
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
