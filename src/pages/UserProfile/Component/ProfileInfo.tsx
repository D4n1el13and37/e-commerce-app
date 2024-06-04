/* import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../../../components/ui/button/Button';
import CustomerInfo from './profileNavigation/СustomerInfo';
import PersonalInfo from './profileNavigation/PasswordlInfo';
import AddressInfo from './profileNavigation/AddressInfo';

import classes from '../userProfile.module.scss';

const ProfileInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('СustomerInfo');

  const profileNav = [
    { name: 'Profile Info', key: 'СustomerInfo' },
    { name: 'Shipping Address', key: 'ShippingInfo' },
    { name: 'Billing Address', key: 'BillingInfo' },
    { name: 'Change Password', key: 'PersonalInfo' },
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
            <li className={classes.profileNav__item} key={index}>
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
 */

import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import Button from '../../../components/ui/button/Button';
import CustomerInfo from './profileNavigation/СustomerInfo';
import PersonalInfo from './profileNavigation/PasswordlInfo';
import AddressInfo from './profileNavigation/AddressInfo';

import classes from '../userProfile.module.scss';

const ProfileInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('СustomerInfo');
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const profileNav = [
    { name: 'Profile Info', key: 'СustomerInfo' },
    { name: 'Shipping Address', key: 'ShippingInfo' },
    { name: 'Billing Address', key: 'BillingInfo' },
    { name: 'Change Password', key: 'PersonalInfo' },
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

  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      activeTabRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  const setTabRef = (key: string, element: HTMLLIElement | null) => {
    tabRefs.current[key] = element;
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profileNav}>
        <ul className={classes.profileNav__link}>
          {profileNav.map((link, index) => (
            <li
              className={classes.profileNav__item}
              key={index}
              ref={(el) => setTabRef(link.key, el)}
            >
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
