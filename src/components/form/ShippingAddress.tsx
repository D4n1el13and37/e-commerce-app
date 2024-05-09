import React from 'react';

import Address from './Address';

export default function ShippingAddress({ register, errors }) {
  return (
    <div>
      <h3>Shipping Address</h3>
      <Address register={register} errors={errors} />
    </div>
  );
}
