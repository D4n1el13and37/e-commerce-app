import cn from 'classnames';

import React from 'react';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';

const PersonalInfo: React.FC<UserProps> = ({ dataUser }) => (
  <div className={cn(classes.profileData__data)}>
    <div className={cn(classes.profileData__field)}>
      <Input
        type="text"
        label="Email address"
        autoComplete="email"
        id="email"
        value={dataUser?.email}
      />
      <Input
        data-testid="password"
        label="Password"
        autoComplete="current-password"
        type="text"
        id="password"
        value={dataUser?.password}
      />
    </div>
  </div>
);

export default PersonalInfo;
