import cn from 'classnames';
import React from 'react';
import { Customer } from '@commercetools/platform-sdk';
import classes from '../userProfile.module.scss';

export interface UserProps {
  dataUser: Customer | undefined;
}

const UserInfo: React.FC<UserProps> = ({ dataUser }) => (
  <>
    <div className={cn(classes.header)}>
      <p className={cn(classes.user__name)}>
        {dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}
      </p>
      <p className={cn(classes.user__email)}>{dataUser?.email ?? ''}</p>
    </div>
    <div className={cn(classes.user__photo)}>
      <img src="" alt="" />
    </div>
  </>
);

export default UserInfo;
