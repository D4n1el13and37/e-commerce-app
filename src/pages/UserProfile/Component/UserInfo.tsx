import React from 'react';
import { Customer } from '@commercetools/platform-sdk';
import classes from '../userProfile.module.scss';

export interface UserProps {
  dataUser: Customer | undefined;
}

const UserInfo: React.FC<UserProps> = ({ dataUser }) => (
  <>
    <div className={classes.header}>
      <span className={classes.user__name}>
        {dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}
      </span>
      <p className={classes.user__email}>{dataUser?.email ?? ''}</p>
    </div>
    <div className={classes.user__photo}>
      <img src="" alt="" />
    </div>
  </>
);

export default UserInfo;
