import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../../../components/ui/button/Button';
import CustomerInfo from './profileNavigation/СustomerInfo';
import PersonalInfo from './profileNavigation/PersonalInfo';
import classes from '../userProfile.module.scss';
import AddressInfo from './profileNavigation/AddressInfo';

const ProfileInfo: React.FC = () => {
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
        return <CustomerInfo />;
      case 'ShippingInfo':
        return <AddressInfo addressType="Shipping" />;
      case 'BillingInfo':
        return <AddressInfo addressType="Billing" />;
      case 'PersonalInfo':
        return <PersonalInfo />;
      default:
        return <CustomerInfo />;
    }
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profileNav}>
        <ul className={classes.profileNav__link}>
          {profileNav.map((link, index) => (
            <li key={index}>
              <Button
                type="button"
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
    </div>
  );
};

export default ProfileInfo;
