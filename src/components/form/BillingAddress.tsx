import React from 'react';
import AddressForm from './AddressForm';

export default function BillingAddress({ register, errors }) {
  return (
    <div>
      <h3>Billing Address</h3>
      <AddressForm register={register} errors={errors} />
    </div>
  );
}
