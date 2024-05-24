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
      <h4 className={cn(classes.header__text)}>Account</h4>
      <p className={cn(classes.user__name)}>
        Hello, {dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}!
      </p>
    </div>
    <div className={cn(classes.user__photo)}>
      <img src="" alt="" />
    </div>
  </>
);

export default UserInfo;
