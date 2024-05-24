import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const ShippingInfo: React.FC<UserProps> = ({ dataUser }) => {
  const addressesShipping = dataUser?.addresses[0];
  console.log(addressesShipping);
  return (
    <div className={cn(classes.profileData__data)}>
      <Input
        id="countryShipping"
        label="Country"
        type="text"
        value={addressesShipping?.country}
        disabled={true}
      />
      <Input
        id="cityShipping"
        label="City"
        type="text"
        value={addressesShipping?.city}
        disabled={true}
      />

      <Input
        id={`streetShipping`}
        label="Street"
        type="text"
        value={addressesShipping?.streetName}
        disabled={true}
      />

      <Input
        id="postcodeShipping"
        label="Postcode"
        type="text"
        value={addressesShipping?.postalCode}
        disabled={true}
      />
    </div>
  );
};

export default ShippingInfo;
