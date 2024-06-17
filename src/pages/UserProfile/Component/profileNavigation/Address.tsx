import React, { useEffect, useState } from 'react';
import AddressBlock from './Address/AddressBlock';
import useAppSelector from '../../../../hooks/useAppSelector';
import useAppDispatch from '../../../../hooks/useAppDispatch';

import {
  fetchAddresses,
  selectAddresses,
  selectDefaultBillingAddressId,
  selectDefaultShippingAddressId,
  selectShippingAddressId,
} from '../../../../store/addressSlice';

import classes from './Address/AddressInfo.module.scss';
import Button from '../../../../components/ui/button/Button';

import AddNewModal from '../ChangeAddressModal/AddNewModal copy';

const Address: React.FC = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddresses);
  const defaultShippingAddress = useAppSelector(selectDefaultShippingAddressId);
  const defaultBillingAddress = useAppSelector(selectDefaultBillingAddressId);
  // const billingAddressId = useAppSelector(selectBillingAddressId);
  const shippingAddressId = useAppSelector(selectShippingAddressId);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  function checkTypeAddress(id: string) {
    return shippingAddressId?.includes(id) ? 'Shipping' : 'Billing';
  }

  return (
    <>
      <div className={classes.addressBlockWrapper}>
        {addresses.map((address) => (
          <AddressBlock
            id={address.id}
            addressType={checkTypeAddress(address.id)}
            defaultShipping={
              address.id === defaultShippingAddress
                ? 'Default Shipping Address'
                : ''
            }
            defaultBilling={
              address.id === defaultBillingAddress
                ? 'Default Billing Address'
                : ''
            }
            country={address.country || ''}
            city={address.city || ''}
            streetName={address.streetName || ''}
            postalCode={address.postalCode || ''}
          />
        ))}
      </div>
      <Button
        isMain={true}
        isFilled={true}
        onClick={() => {
          setIsOpenEdit(true);
        }}
      >
        Add new address
      </Button>
      <AddNewModal
        isOpen={isOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
      />
    </>
  );
};
export default Address;
