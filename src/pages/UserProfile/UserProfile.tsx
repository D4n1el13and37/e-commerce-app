import cn from 'classnames';
import React, { useEffect } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import UserInfo from './Component/UserInfo';
import ProfileInfo from './Component/ProfileInfo';
import Header from '../../components/header/Header';

import classes from './userProfile.module.scss';
import { getCustomer } from '../../api/Customer/customer';
import { setDataUser } from '../../store/customerSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomer();
        dispatch(setDataUser(customer));
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    };

    fetchCustomer();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={'container'}>
        <div className={cn('grid', classes.account)}>
          <UserInfo />
          <ProfileInfo />
        </div>
      </main>
    </>
  );
};

export default UserProfile;
