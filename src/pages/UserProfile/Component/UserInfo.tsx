import React from 'react';
import classes from '../userProfile.module.scss';
import { RootState } from '../../../store/store';
import useAppSelector from '../../../hooks/useAppSelector';

const UserInfo: React.FC = () => {
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );

  return (
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
};

export default UserInfo;
