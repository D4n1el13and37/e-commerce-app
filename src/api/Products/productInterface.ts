import {
  LocalizedString,
  ProductPriceModeEnum,
} from '@commercetools/platform-sdk';

interface ProductTypeResourceIdentifier {
  typeId: 'product-type';
  id: string;
}

interface CategoryResourceIdentifier {
  typeId: 'category';
  id: string;
}

interface ProductVariantDraft {
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
  attributes?: { name: string; value: any }[];
}

export interface UpdatedProductDraft {
  /**
   * The Product Type defining the Attributes for the Product. Cannot be changed later.
   */
  readonly productType: ProductTypeResourceIdentifier;

  /**
   * Name of the Product.
   */
  readonly name: LocalizedString;

  /**
   * User-defined identifier used in a deep-link URL for the Product.
   * It must be unique across a Project, but a Product can have the same slug in different Locales.
   * It must match the pattern `[a-zA-Z0-9_\\-]{2,256}`.
   */
  readonly slug: LocalizedString;

  /**
   * Description of the Product.
   */
  readonly description?: LocalizedString;

  /**
   * Title of the Product displayed in search results.
   */
  readonly metaTitle?: LocalizedString;

  /**
   * Description of the Product displayed in search results.
   */
  readonly metaDescription?: LocalizedString;

  /**
   * Keywords that give additional information about the Product to search engines.
   */
  readonly metaKeywords?: LocalizedString;

  /**
   * The Product Variant to be the Master Variant for the Product. Required if `variants` are provided also.
   */
  readonly masterVariant: ProductVariantDraft;

  /**
   * The additional Product Variants for the Product.
   */
  readonly variants?: ProductVariantDraft[];

  /**
   * Categories assigned to the Product.
   */
  readonly categories?: CategoryResourceIdentifier[];

  /**
   * If `true`, the Product is published immediately to the current projection.
   */
  readonly publish?: boolean;

  /**
   * Specifies the type of prices used when looking up a price for the Product.
   */
  readonly priceMode?: ProductPriceModeEnum;
}
