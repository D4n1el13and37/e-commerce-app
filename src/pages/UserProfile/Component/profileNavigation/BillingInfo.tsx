import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const BillingInfo: React.FC<UserProps> = ({ dataUser }) => {
  const addressesBilling = dataUser?.addresses[1];
  const defaultBillingAddress = !!dataUser?.defaultBillingAddressId;
  return (
    <div className={classes.profileData__data}>
      {defaultBillingAddress ? (
        <span className={classes.default}>Default billing address</span>
      ) : (
        ''
      )}
      <div className={classes.profileData__field}>
        <Input
          id="countryBilling"
          label="Country"
          type="text"
          value={addressesBilling?.country}
        />
        <Input
          id="cityBilling"
          label="City"
          type="text"
          value={addressesBilling?.city}
        />

        <Input
          id={`streetBilling`}
          label="Street"
          type="text"
          value={addressesBilling?.streetName}
        />

        <Input
          id="postcodeBilling"
          label="Postcode"
          type="text"
          value={addressesBilling?.postalCode}
        />
      </div>
    </div>
  );
};

export default BillingInfo;
