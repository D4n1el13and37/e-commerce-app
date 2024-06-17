import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { CustomerAddAddressAction } from '@commercetools/platform-sdk';

import Button from '../../../../components/ui/button/Button';
import classes from './EditModeModal.module.scss';
import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
import City from '../../../../components/form/address/city/city';
import Street from '../../../../components/form/address/street/street';
import Postcode from '../../../../components/form/address/postcode/postcode';
import { CountryOptionInterface } from '../../../Register/Component/AddressForm/countryOptions';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import { selectVersion, updateAddress } from '../../../../store/addressSlice';
import SuccessModal from '../SuccesModal/SuccessModal';

import { Address, CustomModalProps } from './EditModeInterface';

const AddNewModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );
  const versionEdit = useAppSelector(selectVersion);

  const methods = useForm<Address>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const [isEditSuccess, setIsEditSuccess] = useState(false);

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOptionInterface> | null>(null);

  const onSubmit: SubmitHandler<Address> = (data) => {
    const customerId = dataUser!.id;

    const addAddress: CustomerAddAddressAction = {
      action: 'addAddress',
      address: data,
    };

    const updateData = {
      version: versionEdit,
      actions: [addAddress],
    };

    dispatch(updateAddress({ customerId, data: updateData }))
      .then(() => {
        setIsEditSuccess(true);

        setTimeout(() => {
          setIsEditSuccess(false);
          onRequestClose();
        }, 2000);
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.ReactModal__Content}
      overlayClassName={classes.ReactModal__Overlay}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.modal}>
          <h2 className={classes.modal__header}>Add new address</h2>
          <div>
            <CountrySelect
              control={control}
              name="country"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            <div className={classes.error_container}>
              {errors.country && (
                <span className="error">
                  {errors.country.message as string}
                </span>
              )}
            </div>
          </div>
          <div className={classes.input_container}>
            <City {...register('city')} id="city" />
            <Street {...register('streetName')} id="streetName" />
          </div>
          <Postcode
            {...register('postalCode')}
            id="postalCode"
            selectedCountry={selectedCountry}
          />

          <div className={classes.button_container}>
            <Button
              isMain={true}
              isFilled={true}
              isDisabled={isEditSuccess}
              type="submit"
            >
              Save changes
            </Button>
            <Button isMain={true} type="button" onClick={onRequestClose}>
              Cancel
            </Button>

            <SuccessModal isOpen={isEditSuccess} />
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddNewModal;
