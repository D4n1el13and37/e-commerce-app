import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const CustomerInfo: React.FC<UserProps> = ({ dataUser }) => (
  <div className={cn(classes.profileData__data)}>
    <Input
      id="firstName"
      autoComplete="firstName"
      label="First Name"
      type="text"
      value={dataUser?.firstName ?? ''}
      disabled={true}
    />
    <Input
      id="lastName"
      label="Last Name"
      type="text"
      value={dataUser?.lastName ?? ''}
      disabled={true}
    />
    <Input
      id="dateBirth"
      label="Date of Birth"
      type="date"
      value={dataUser?.dateOfBirth ?? ''}
      disabled={true}
    />
  </div>
);

export default CustomerInfo;
