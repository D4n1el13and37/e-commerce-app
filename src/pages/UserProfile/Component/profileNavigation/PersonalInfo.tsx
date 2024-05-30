import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

import Input from '../../../../components/ui/input/Input';

import classes from '../../userProfile.module.scss';

const PersonalInfo: React.FC = () => {
  const dataUser = useSelector((state: RootState) => state.customer.dataUser);

  return (
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
};
export default PersonalInfo;
