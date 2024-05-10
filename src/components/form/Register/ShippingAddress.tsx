import React from 'react';
import AddressForm from './AddressForm/AddressForm';
import classes from './Rigister.module.scss';

export default function ShippingAddress({ register, errors }) {
  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Shipping Address</h3>
      <AddressForm register={register} errors={errors} />
    </div>
  );
}
