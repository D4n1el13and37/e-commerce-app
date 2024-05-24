import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const BillingInfo: React.FC<UserProps> = ({ dataUser }) => {
  const addressesBilling = dataUser?.addresses[1];
  console.log(addressesBilling);
  return (
    <div className={cn(classes.profileData__data)}>
      <Input
        id="countryBilling"
        label="Country"
        type="text"
        value={addressesBilling?.country}
        disabled={true}
      />
      <Input
        id="cityBilling"
        label="City"
        type="text"
        value={addressesBilling?.city}
        disabled={true}
      />

      <Input
        id={`streetBilling`}
        label="Street"
        type="text"
        value={addressesBilling?.streetName}
        disabled={true}
      />

      <Input
        id="postcodeBilling"
        label="Postcode"
        type="text"
        value={addressesBilling?.postalCode}
        disabled={true}
      />
    </div>
  );
};

export default BillingInfo;
