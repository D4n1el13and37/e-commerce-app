import React from 'react';
import UserInfo from './Component/UserInfo';
import ProfileInfo from './Component/ProfileInfo';
import Header from '../../components/header/Header';

const UserProfile: React.FC = () => (
  <>
    <Header />
    <main>
      <UserInfo />
      <ProfileInfo />
    </main>
  </>
);

export default UserProfile;
