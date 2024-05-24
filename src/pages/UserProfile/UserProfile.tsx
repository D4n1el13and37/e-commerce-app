import cn from 'classnames';

import React, { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import UserInfo from './Component/UserInfo';
import ProfileInfo from './Component/ProfileInfo';
import Header from '../../components/header/Header';

import classes from './userProfile.module.scss';
import getCustomer from '../../api/Customer/customer';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomer();
        console.log(customer);
        setUser(customer);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    };

    fetchCustomer();
  }, []);

  return (
    <>
      <Header />
      <main className={cn('container')}>
        <div className={cn('grid', classes.account)}>
          <UserInfo dataUser={user} />
          <ProfileInfo dataUser={user} />
        </div>
      </main>
    </>
  );
};

export default UserProfile;
