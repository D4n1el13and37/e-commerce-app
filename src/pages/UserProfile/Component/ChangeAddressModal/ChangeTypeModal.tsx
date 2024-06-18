import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerRemoveBillingAddressIdAction,
  CustomerRemoveShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';
import Button from '../../../../components/ui/button/Button';
import classes from './EditModeModal.module.scss';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import { selectVersion, updateAddress } from '../../../../store/addressSlice';
import { CustomModalProps } from './EditModeInterface';

type CustomerAddressActionType =
  | CustomerAddBillingAddressIdAction
  | CustomerAddShippingAddressIdAction
  | CustomerRemoveBillingAddressIdAction
  | CustomerRemoveShippingAddressIdAction
  | CustomerSetDefaultBillingAddressAction
  | CustomerSetDefaultShippingAddressAction;

const ChangeTypeModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  address,
}) => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );
  const versionEdit = useAppSelector(selectVersion);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  const handleSubmit = (
    actions: CustomerAddressActionType[],
    successCallback?: () => void
  ) => {
    const customerId = dataUser!.id;
    const updateData = {
      version: versionEdit,
      actions,
    };

    dispatch(updateAddress({ customerId, data: updateData }))
      .then(() => {
        if (successCallback) successCallback();
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      });
  };

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 1500);
  }

  const handleShippingAddress = () =>
    handleSubmit(
      [
        { action: 'addShippingAddressId', addressId: address?.id },
        { action: 'removeBillingAddressId', addressId: address?.id },
      ],
      () => {
        setIsEditSuccess(true);
        removeMessage();
      }
    );

  const handleBillingAddress = () =>
    handleSubmit(
      [
        { action: 'addBillingAddressId', addressId: address?.id },
        { action: 'removeShippingAddressId', addressId: address?.id },
      ],
      () => {
        setIsEditSuccess(true);
        removeMessage();
      }
    );

  const handleDefaultBillingAddress = () =>
    handleSubmit(
      [{ action: 'setDefaultBillingAddress', addressId: address?.id }],
      () => {
        setIsEditSuccess(true);
        removeMessage();
      }
    );

  const handleDefaultShippingAddress = () =>
    handleSubmit(
      [{ action: 'setDefaultShippingAddress', addressId: address?.id }],
      () => {
        setIsEditSuccess(true);
        removeMessage();
      }
    );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.ReactModal__Content}
      overlayClassName={classes.ReactModal__Overlay}
    >
      <div className={classes.changeTypeModal}>
        <div className={classes.changeTypeModal__changeType}>
          <h3 className={classes.changeTypeModal__header}>
            Change Type Address
          </h3>
          <div className={classes.changeTypeModal__buttonBox}>
            <Button isMain onClick={handleShippingAddress}>
              Shipping Address
            </Button>
            <Button isMain onClick={handleBillingAddress}>
              Billing Address
            </Button>
          </div>
        </div>
        <div className={classes.changeTypeModal__changeDefault}>
          <h3 className={classes.changeTypeModal__header}>
            Set Default Address
          </h3>
          <div className={classes.changeTypeModal__buttonBox}>
            <Button isMain onClick={handleDefaultShippingAddress}>
              Default Shipping Address
            </Button>
            <Button isMain onClick={handleDefaultBillingAddress}>
              Default Billing Address
            </Button>
          </div>
        </div>
        <Button onClick={onRequestClose} isMain isFilled>
          Cansel
        </Button>
        {isEditSuccess && (
          <span className={classes.successMessage}>
            The changes are successful!
          </span>
        )}
      </div>
    </Modal>
  );
};

export default ChangeTypeModal;
