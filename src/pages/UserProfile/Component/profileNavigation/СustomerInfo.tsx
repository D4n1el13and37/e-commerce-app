import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const CustomerInfo: React.FC<UserProps> = ({ dataUser }) => (
  <div className={cn(classes.profileData__data)}>
    <div className={cn(classes.profileData__field)}>
      <Input
        id="firstName"
        autoComplete="firstName"
        label="First Name"
        type="text"
        value={dataUser?.firstName ?? ''}
      />
      <Input
        id="lastName"
        label="Last Name"
        type="text"
        value={dataUser?.lastName ?? ''}
      />
      <Input
        id="dateBirth"
        label="Date of Birth"
        type="date"
        value={dataUser?.dateOfBirth ?? ''}
      />
    </div>
  </div>
);

export default CustomerInfo;
