import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

export interface RegisterFormFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirth: string;

  streetShipping: string;
  cityShipping: string;
  postcodeShipping: string;
  countryShipping: string;

  streetBilling: string;
  cityBilling: string;
  postcodeBilling: string;
  countryBilling: string;
}

export interface FormInfoProps {
  register: UseFormRegister<RegisterFormFields>;
  errors: FieldErrors<RegisterFormFields>;
  control?: Control<RegisterFormFields>;
}
