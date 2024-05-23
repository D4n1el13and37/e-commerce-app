import cn from 'classnames';

import React from 'react';
import UserInfo from './Component/UserInfo';
import ProfileInfo from './Component/ProfileInfo';
import Header from '../../components/header/Header';

import classes from './userProfile.module.scss';

const UserProfile: React.FC = () => (
  <>
    <Header />
    <main className={cn('container')}>
      <div className={cn('grid', classes.account)}>
        <UserInfo />
        <ProfileInfo />
      </div>
    </main>
  </>
);

export default UserProfile;
