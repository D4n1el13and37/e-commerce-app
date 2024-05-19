export interface RegisterFormFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  streetShipping: string;
  cityShipping: string;
  postcodeShipping: string;
  countryShipping: string;
  streetBilling: string;
  cityBilling: string;
  postcodeBilling: string;
  countryBilling: string;
  dateBirth: string;

  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}
