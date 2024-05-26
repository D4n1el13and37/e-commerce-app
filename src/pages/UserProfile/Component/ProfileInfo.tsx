import cn from 'classnames';

import React, { useState } from 'react';
import Button from '../../../components/ui/button/Button';
import CustomerInfo from './profileNavigation/СustomerInfo';
import ShippingInfo from './profileNavigation/ShippingInfo';
import BillingInfo from './profileNavigation/BillingInfo';
import PersonalInfo from './profileNavigation/PersonalInfo';

import classes from '../userProfile.module.scss';
import { UserProps } from './UserInfo';

const ProfileInfo: React.FC<UserProps> = ({ dataUser }) => {
  const [activeTab, setActiveTab] = useState('СustomerInfo');

  const profileNav = [
    { name: 'Profile Info', key: 'СustomerInfo' },
    { name: 'Shipping Info', key: 'ShippingInfo' },
    { name: 'Billing Info', key: 'BillingInfo' },
    { name: 'Personal Info', key: 'PersonalInfo' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'СustomerInfo':
        return <CustomerInfo dataUser={dataUser} />;
      case 'ShippingInfo':
        return <ShippingInfo dataUser={dataUser} />;
      case 'BillingInfo':
        return <BillingInfo dataUser={dataUser} />;
      case 'PersonalInfo':
        return <PersonalInfo dataUser={dataUser} />;
      default:
        return <CustomerInfo dataUser={dataUser} />;
    }
  };

  return (
    <>
      <div className={classes.profile}>
        <div className={classes.profileNav}>
          <ul className={classes.profileNav__link}>
            {profileNav.map((link, index) => (
              <li key={index}>
                <Button
                  type="submit"
                  isMain={true}
                  onClick={() => setActiveTab(link.key)}
                  className={cn(
                    classes.profileNav__tab,
                    activeTab === link.key ? classes.profileNav__active : ''
                  )}
                >
                  {link.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.profileData}>{renderContent()}</div>
        {}
      </div>
    </>
  );
};

export default ProfileInfo;
