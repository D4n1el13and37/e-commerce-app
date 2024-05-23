import { ProductTypeDraft, AttributeType } from '@commercetools/platform-sdk';
import { projectKey } from '../clientConfig';
import getApiRoot from '../api';

export default async function createProductType(
  productTypeDraft: ProductTypeDraft
): Promise<void> {
  try {
    const response = await getApiRoot()
      .withProjectKey({ projectKey })
      .productTypes()
      .post({ body: productTypeDraft })
      .execute();
    // eslint-disable-next-line no-console
    console.log('Product type created successfully:', response.body);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

const newType: ProductTypeDraft = {
  key: 'plant-product-type',
  name: 'Plant Product Type',
  description: 'Product type for various plants',
  attributes: [
    // {
    //   name: 'easyToCare',
    //   label: { en: 'Easy to Care', ru: 'Легкий уход' },
    //   type: { name: 'boolean' } as AttributeType,
    //   isRequired: false,
    //   isSearchable: true,
    // },
    // {
    //   name: 'airPurifying',
    //   label: { en: 'Air Purifying', ru: 'Очищающие воздух' },
    //   type: { name: 'boolean' } as AttributeType,
    //   isRequired: false,
    //   isSearchable: true,
    // },
    // {
    //   name: 'petFriendly',
    //   label: { en: 'Pet Friendly', ru: 'Безопасные для животных' },
    //   type: { name: 'boolean' } as AttributeType,
    //   isRequired: false,
    //   isSearchable: true,
    // },
    {
      name: 'size',
      label: { en: 'Size', ru: 'Размер' },
      type: {
        name: 'enum',
        values: [
          { key: 's', label: 'Small' },
          { key: 'm', label: 'Medium' },
          { key: 'l', label: 'Large' },
        ],
      } as AttributeType,
      isRequired: false,
      isSearchable: true,
    },
    {
      name: 'color',
      label: { en: 'Color', ru: 'Цвет' },
      type: { name: 'text' } as AttributeType,
      isRequired: false,
      isSearchable: true,
    },
  ],
};

createProductType(newType)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Product type created successfully');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error creating product type:', error);
  });
