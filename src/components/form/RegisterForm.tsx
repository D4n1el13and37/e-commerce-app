import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../ui/button/Button';

type RegisterFormFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirth: string;

  street: string;
  city: string;
  postcode: number;
  country: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<RegisterFormFields> = (/* data */) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>

      <PersonalInfo register={register} errors={errors} />

      <div>
        <ShippingAddress register={register} errors={errors} />
        <BillingAddress register={register} errors={errors} />
      </div>

      <Button type="submit" isMain={true} isFilled={true}>
        Submit
      </Button>
    </form>
  );
}
