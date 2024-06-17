import React, { useState } from 'react';
import { CustomerRemoveAddressAction } from '@commercetools/platform-sdk';
import Button from '../../../../../components/ui/button/Button';

import classes from './AddressInfo.module.scss';
import EditModeModal from '../../ChangeAddressModal/EditModeModal';
import useAppSelector from '../../../../../hooks/useAppSelector';
import {
  selectVersion,
  updateAddress,
} from '../../../../../store/addressSlice';
import useAppDispatch from '../../../../../hooks/useAppDispatch';
import ChangeTypeModal from '../../ChangeAddressModal/ChangeTypeModal';
import { RootState } from '../../../../../store/store';

interface AddressBlockProps {
  id: string;
  addressType: string;
  defaultShipping?: string;
  defaultBilling?: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

const AddressBlock: React.FC<AddressBlockProps> = ({
  id,
  country,
  city,
  streetName,
  postalCode,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );
  const versionEdit = useAppSelector(selectVersion);

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenChangeTypeModal, setIsOpenChangeTypeModal] = useState(false);

  const handleRemoveAddress = () => {
    const customerId = dataUser?.id;

    const setAddress: CustomerRemoveAddressAction = {
      action: 'removeAddress',
      addressId: id,
    };
    const actions = [setAddress];

    const updateData = {
      version: versionEdit,
      actions,
    };

    dispatch(updateAddress({ customerId, data: updateData }));
  };
  return (
    <div className={classes.addressBlock}>
      <div className={classes.addressBlock__box}>
        <div className={classes.addressBlock__address}>
          <div className={classes.addressBlock__typeBox}>
            <span className={classes.addressBlock__type}>
              {props.addressType}
            </span>
            {props.defaultShipping && (
              <span className={classes.addressBlock__default}>
                {props.defaultShipping}
              </span>
            )}
            {props.defaultBilling && (
              <span className={classes.addressBlock__default}>
                {props.defaultBilling}
              </span>
            )}
          </div>

          <div className={classes.addressBlock__info}>
            <p className={classes.addressBlock__text}>
              <span className={classes.bold}>Country:</span> {country}
            </p>
            <p className={classes.addressBlock__text}>
              <span className={classes.bold}>City:</span> {city}
            </p>
            <p className={classes.addressBlock__text}>
              <span className={classes.bold}>Street Name:</span> {streetName}
            </p>
            <p className={classes.addressBlock__text}>
              <span className={classes.bold}>Postal Code:</span> {postalCode}
            </p>
          </div>
        </div>
        <Button onClick={() => handleRemoveAddress()}>X</Button>
      </div>

      <div className={classes.addressBlock__buttonWrapper}>
        <Button
          isMain={true}
          onClick={() => {
            setIsOpenEdit(true);
          }}
        >
          Edit
        </Button>

        <EditModeModal
          isOpen={isOpenEdit}
          onRequestClose={() => setIsOpenEdit(false)}
          address={{ id, country, city, streetName, postalCode }}
        />

        <Button isMain={true} onClick={() => setIsOpenChangeTypeModal(true)}>
          Change Type
        </Button>
        <ChangeTypeModal
          isOpen={isOpenChangeTypeModal}
          onRequestClose={() => setIsOpenChangeTypeModal(false)}
          address={{ id }}
        />
      </div>
    </div>
  );
};
export default AddressBlock;
