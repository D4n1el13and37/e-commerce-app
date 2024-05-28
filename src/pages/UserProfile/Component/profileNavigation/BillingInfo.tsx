import React from 'react';
import { ProfileInfoProps } from '../ProfileInfo';
import AddressInfo from './addressInfo';

const ShippingInfo: React.FC<ProfileInfoProps> = ({
  dataUser,
  setDataUser,
}) => (
  <AddressInfo
    dataUser={dataUser}
    setDataUser={setDataUser}
    addressType="Billing"
  />
);
export default ShippingInfo;
