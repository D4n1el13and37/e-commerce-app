import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import {
  BaseAddress,
  CustomerChangeAddressAction,
} from '@commercetools/platform-sdk';

import Button from '../../../../components/ui/button/Button';
import classes from './EditModeModal.module.scss';
import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
import City from '../../../../components/form/address/city/city';
import Street from '../../../../components/form/address/street/street';
import Postcode from '../../../../components/form/address/postcode/postcode';
import {
  CountryOptionInterface,
  countryOptions,
} from '../../../Register/Component/AddressForm/countryOptions';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import { selectVersion, updateAddress } from '../../../../store/addressSlice';

import { CustomModalProps } from './EditModeInterface';

const EditModeModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  address,
}) => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );
  const versionEdit = useAppSelector(selectVersion);

  const methods = useForm<BaseAddress>({
    defaultValues: {
      country: address?.country,
      city: address?.city,
      streetName: address?.streetName,
      postalCode: address?.postalCode,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [isEditSuccess, setIsEditSuccess] = useState(false);

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOptionInterface> | null>(
      countryOptions.find((option) => option.value === address?.country) || null
    );

  const onSubmit: SubmitHandler<BaseAddress> = (data) => {
    const customerId = dataUser!.id;

    const setAddress: CustomerChangeAddressAction = {
      action: 'changeAddress',
      addressId: address!.id,
      address: data,
    };
    const actions = [setAddress];

    const updateData = {
      version: versionEdit,
      actions,
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
          <h2 className={classes.modal__header}>Edit</h2>
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
            <City name={address!.city} id="city" />
            <Street name={address!.streetName} id="streetName" />
          </div>
          <Postcode
            name={address!.postalCode}
            id="postalCode"
            selectedCountry={selectedCountry}
          />

          <div className={classes.button_container}>
            <Button isMain={true} isFilled={true} type="submit">
              Save changes
            </Button>

            <Button isMain={true} type="button" onClick={onRequestClose}>
              Cancel
            </Button>

            {isEditSuccess && (
              <span className={classes.successMessage}>
                {' '}
                The changes are successful!
              </span>
            )}
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditModeModal;
