interface Address {
  id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface MyCustom {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  salutation?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses?: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses: [0];
  billingAddresses: [1];
}
