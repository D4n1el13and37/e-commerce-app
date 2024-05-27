import React from 'react';
import Input from '../../../../components/ui/input/Input';

import classes from '../../userProfile.module.scss';
import { ProfileInfoProps } from '../ProfileInfo';

const PersonalInfo: React.FC<ProfileInfoProps> = ({ dataUser }) => (
  <div className={classes.profileData__data}>
    <div className={classes.profileData__field}>
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
