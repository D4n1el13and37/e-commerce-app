import cn from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from './Component/UserInfo';
import ProfileInfo from './Component/ProfileInfo';
import Header from '../../components/header/Header';

import classes from './userProfile.module.scss';
import { getCustomer } from '../../api/Customer/customer';
import { setDataUser } from '../../store/customerSlice';
import { RootState } from '../../store/store';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.customer.dataUser);

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
      <main className={cn('container')}>
        <div className={cn('grid', classes.account)}>
          <UserInfo dataUser={user} />
          <ProfileInfo />
        </div>
      </main>
    </>
  );
};

export default UserProfile;
