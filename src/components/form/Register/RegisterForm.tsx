import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../ui/button/Button';
import Checkbox from '../../ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';

interface RegisterFormFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirth: string;

  street: string;
  city: string;
  postcode: number;
  country: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({ mode: 'onSubmit' });
  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form className={`${classes.form}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${classes.form__title}`}>Sign up</h2>

      <PersonalInfo register={register} errors={errors} />

      <div className={`${classes.form__addresses}`}>
        <ShippingAddress register={register} errors={errors} />
        <BillingAddress register={register} errors={errors} />
      </div>

      <Checkbox
        label="Are the billing and shipping addresses the same?"
        isChecked={true}
      />

      <Button type="submit" isMain={true} isFilled={true}>
        Submit
      </Button>
    </form>
  );
}
