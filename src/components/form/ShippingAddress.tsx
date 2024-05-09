import React from 'react';
import AddressForm from './AddressForm';

export default function ShippingAddress({ register, errors }) {
  return (
    <div>
      <h3>Shipping Address</h3>
      <AddressForm register={register} errors={errors} />
    </div>
  );
}
