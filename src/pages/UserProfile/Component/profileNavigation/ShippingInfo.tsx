import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const ShippingInfo: React.FC<UserProps> = ({ dataUser }) => {
  const addressesShipping = dataUser?.addresses[0];
  const defaultShippingAddress = !!dataUser?.defaultShippingAddressId;
  console.log(defaultShippingAddress);
  return (
    <div className={cn(classes.profileData__data)}>
      {defaultShippingAddress ? (
        <span className={cn(classes.default)}>Default shipping address</span>
      ) : (
        ''
      )}
      <div className={cn(classes.profileData__field)}>
        <Input
          id="countryShipping"
          label="Country"
          type="text"
          value={addressesShipping?.country}
        />
        <Input
          id="cityShipping"
          label="City"
          type="text"
          value={addressesShipping?.city}
        />

        <Input
          id={`streetShipping`}
          label="Street"
          type="text"
          value={addressesShipping?.streetName}
        />

        <Input
          id="postcodeShipping"
          label="Postcode"
          type="text"
          value={addressesShipping?.postalCode}
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
