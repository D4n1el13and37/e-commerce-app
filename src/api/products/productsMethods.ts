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
  category?: string;
}

export async function getCardsByFilters(
  filters: FilterValue & { category?: string }
): Promise<ProductProjectionPagedSearchResponse> {
  const { size, careLevel, lightRequirement, category } = filters;

  const filterQueries: string[] = [];

  const filterSize: string[] = [];
  const filterCareLevel: string[] = [];
  const filterLightRequirement: string[] = [];

  let filterSizeQueries: string;
  let filterCareLevelQueries: string;
  let filterLightRequirementQueries: string;

  if (category) {
    filterQueries.push(`categories.id:"${category}"`);
  }

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
      throw new Error('Error during product filtration');
    }
  }
}

export interface SortingValue {
  sortBy: 'price' | 'name' | '';
  sortOrder: 'asc' | 'desc' | '';
  category?: string;
  filters?: FilterValue;
}

export async function getCardsBySorting(
  sorting: SortingValue
): Promise<ProductProjectionPagedSearchResponse> {
  const { sortBy, sortOrder, category, filters } = sorting;
  const filterQueries: string[] = [];

  if (category) {
    filterQueries.push(`categories.id:"${category}"`);
  }

  if (filters) {
    if (filters.size.length > 0) {
      const sizeFilter = filters.size
        .map((s) => `variants.attributes.size.key:"${s}"`)
        .join(' ');
      filterQueries.push(sizeFilter);
    }
    if (filters.careLevel.length > 0) {
      const careLevelFilter = filters.careLevel
        .map((cl) => `variants.attributes.careLevel.key:"${cl}"`)
        .join(' ');
      filterQueries.push(careLevelFilter);
    }
    if (filters.lightRequirement.length > 0) {
      const lightRequirementFilter = filters.lightRequirement
        .map((lr) => `variants.attributes.lightRequirement.key:"${lr}"`)
        .join(' ');
      filterQueries.push(lightRequirementFilter);
    }
  }

  const sortField = sortBy === 'price' ? 'price' : 'name.en-US';
  const sortQuery = `${sortField} ${sortOrder}`;

  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filterQueries,
          sort: [sortQuery],
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
