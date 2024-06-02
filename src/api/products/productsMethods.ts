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

  const filterQueries: string[] = [];

  const filterSize: string[] = [];
  const filterCareLevel: string[] = [];
  const filterLightRequirement: string[] = [];

  let filterSizeQueries: string;
  let filterCareLevelQueries: string;
  let filterLightRequirementQueries: string;

  if (size.length > 0) {
    size.forEach((s) => {
      filterSize.push(`"${s}"`);
      filterSize.join(',');
      filterSizeQueries = `variants.attributes.size.key:${filterSize}`;
      filterQueries.push(filterSizeQueries);
    });
  }
  if (careLevel.length > 0) {
    careLevel.forEach((cl) => {
      filterCareLevel.push(`"${cl}"`);
      filterCareLevel.join(',');
      filterCareLevelQueries = `variants.attributes.careLevel.key:${filterCareLevel}`;
      filterQueries.push(filterCareLevelQueries);
    });
  }
  if (lightRequirement.length > 0) {
    lightRequirement.forEach((lr) => {
      filterLightRequirement.push(`"${lr}"`);
      filterLightRequirement.join(',');
      filterLightRequirementQueries = `variants.attributes.lightRequirement.key:${filterLightRequirement}`;
      filterQueries.push(filterLightRequirementQueries);
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

export interface SortingValue {
  sortBy: 'price' | 'name';
  sortOrder: 'asc' | 'desc';
}

export async function getCardsBySorting(
  sorting: SortingValue
): Promise<ProductProjectionPagedSearchResponse> {
  const sortField = sorting.sortBy === 'price' ? 'price' : 'name.en-US';
  const sortQuery = `${sortField} ${sorting.sortOrder}`;

  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: sortQuery,
        },
      })
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during sorting request');
    }
  }
}
