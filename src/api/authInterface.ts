interface Address {
  id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface MyCustom {
  readonly email: string;

  readonly password: string;

  readonly firstName?: string;

  readonly lastName?: string;

  readonly middleName?: string;

  readonly title?: string;

  readonly salutation?: string;

  readonly dateOfBirth?: string;

  readonly companyName?: string;

  readonly vatId?: string;

  readonly addresses?: Address[];

  readonly defaultShippingAddress?: number;

  readonly defaultBillingAddress?: number;

  readonly shippingAddresses: [0];
  readonly billingAddresses: [1];
}
