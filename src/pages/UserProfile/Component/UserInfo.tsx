import cn from 'classnames';

import React, { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import getCustomer from '../../../api/Customer/customer';

import classes from '../userProfile.module.scss';

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomer();
        // console.log(customer);
        setUser(customer);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e);
        }
      }
    };

    fetchCustomer();
  }, []);

  return (
    <>
      <div className={cn(classes.header)}>
        <h4 className={cn(classes.header__text)}>Account</h4>
        <p className={cn(classes.user__name)}>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className={cn(classes.user__photo)}>
        <img src="" alt="" />
      </div>
    </>
  );
};

export default UserInfo;
