import {
  Product,
  ProductDraft,
  CategoryResourceIdentifier,
} from '@commercetools/platform-sdk';
import { projectKey } from '../clientConfig';
import getApiRoot from '../api';

interface ProductData {
  productTypeKey: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  description?: { [key: string]: string }; // Опциональное поле для описания
  masterVariant: {
    sku: string;
    key: string;
    prices: {
      value: {
        currencyCode: string;
        centAmount: number;
      };
    }[];
    images: {
      url: string;
      dimensions: { w: number; h: number };
      label?: string;
    }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { name: string; value: any }[]; // Опциональное поле для атрибутов
  };
  variants?: {
    sku?: string;
    key?: string;
    prices?: {
      value: {
        currencyCode: string;
        centAmount: number;
      };
    }[];
    images?: {
      url: string;
      dimensions: { w: number; h: number };
      label?: string;
    }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { name: string; value: any }[]; // Опциональное поле для атрибутов
  }[];
  categories: { key: string }[];
}

// eslint-disable-next-line import/prefer-default-export
export async function CreateProduct(data: ProductData): Promise<Product> {
  // Получаем ID типа продукта
  const productTypeResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .productTypes()
    .withKey({ key: data.productTypeKey })
    .get()
    .execute();
  const productTypeId = productTypeResponse.body.id;

  // Получаем ID категорий
  const categoriesResponse = await Promise.all(
    data.categories.map(async (category) => {
      const categoryResponse = await getApiRoot()
        .withProjectKey({ projectKey })
        .categories()
        .withKey({ key: category.key })
        .get()
        .execute();
      return {
        typeId: 'category',
        id: categoryResponse.body.id,
      } as CategoryResourceIdentifier;
    })
  );

  // Создаем продукт
  const newProductDetails: ProductDraft = {
    productType: {
      typeId: 'product-type',
      id: productTypeId,
    },
    name: data.name,
    slug: data.slug,
    description: data.description,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    metaKeywords: data.metaKeywords,
    masterVariant: {
      sku: data.masterVariant.sku,
      key: data.masterVariant.key,
      prices: data.masterVariant.prices,
      images: data.masterVariant.images,
      attributes: data.masterVariant.attributes,
    },
    variants: data.variants?.map((variant) => ({
      sku: variant.sku,
      key: variant.key,
      prices: variant.prices,
      images: variant.images,
      attributes: variant.attributes,
    })),
    categories: categoriesResponse,
    publish: true,
  };

  try {
    const request = await getApiRoot()
      .withProjectKey({ projectKey })
      .products()
      .post({ body: newProductDetails })
      .execute();
    const newProduct: Product = request.body;

    return newProduct;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Пример использования функции для создания продукта с несколькими категориями
const newProduct = {
  productTypeKey: 'plant-product-type',
  name: {
    'en-GB': 'Ficus lyrata',
    'ru-RU': 'Фикус',
  },
  slug: {
    'en-GB': 'ficus-lyrata',
    'ru-RU': 'ficus',
  },
  masterVariant: {
    sku: 'GPC-14',
    key: 'variant-key-GPC-14',
    prices: [
      {
        value: {
          currencyCode: 'EUR',
          centAmount: 3999,
        },
      },
    ],
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnSO6VmNkl24tfz6UneM6EQ69xlR9myP2XgHbhB3d-w&s',
        dimensions: { w: 600, h: 600 },
        label: 'Master Image',
      },
    ],
    attributes: [
      { name: 'height', value: 150 },
      { name: 'age', value: 2 },
      { name: 'color', value: 'green' },
    ],
  },
  categories: [
    { key: 'indoor-trees' },
    { key: 'easy-to-care' },
    { key: 'air-purifying' },
  ],
};

CreateProduct(newProduct)
  .then((product) => {
    // eslint-disable-next-line no-console
    console.log('Product created successfully:', product);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error creating product:', error);
  });
