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
      name: 'careLevel',
      label: { en: 'Сare Level', ru: 'Уровень заботы' },
      type: {
        name: 'enum',
        values: [
          { key: 'e', label: 'Easy' },
          { key: 'm', label: 'Medium' },
          { key: 'h', label: 'Hard' },
        ],
      } as AttributeType,
      isRequired: false,
      isSearchable: true,
    },
    {
      name: 'lightRequirement',
      label: { en: 'Light Requirement', ru: 'Требование к освещенности' },
      type: {
        name: 'enum',
        values: [
          { key: 'full', label: 'Full' },
          { key: 'partial', label: 'Partial' },
          { key: 'shade', label: 'Shade' },
        ],
      } as AttributeType,
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
