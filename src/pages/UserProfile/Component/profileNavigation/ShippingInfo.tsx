import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import {
  CustomerChangeAddressAction,
  CustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import classes from '../../userProfile.module.scss';
import { ProfileInfoProps } from '../ProfileInfo';
import { updateCustomer } from '../../../../api/Customer/customer';
import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
import {
  CountryOptionInterface,
  countryOptions,
} from '../../../Register/Component/AddressForm/countryOptions';
import Button from '../../../../components/ui/button/Button';
import SuccessModal from '../SuccesModal/SuccessModal';
import City from '../../../../components/form/address/city/city';
import Street from '../../../../components/form/address/street/street';
import Postcode from '../../../../components/form/address/postcode/postcode';
import Checkbox from '../../../../components/ui/checkbox/Checkbox';

export interface AddressInfoData {
  countryShipping: string;
  cityShipping: string;
  streetNameShipping: string;
  postalCodeShipping: string;
  defaultShippingAddress: boolean;
}

const ShippingInfo: React.FC<ProfileInfoProps> = ({
  dataUser,
  setDataUser,
}) => {
  const methods = useForm<AddressInfoData>({
    mode: 'onChange',
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    register,
    formState: { errors },
  } = methods;

  const addressesShipping = dataUser?.addresses[0];
  const defaultShippingAddressValue = !!dataUser?.defaultShippingAddressId;

  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOptionInterface> | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      trigger('postalCodeShipping');
    }
  }, [selectedCountry, trigger]);

  useEffect(() => {
    if (dataUser) {
      reset({
        countryShipping: addressesShipping?.country || '',
        cityShipping: addressesShipping?.city || '',
        streetNameShipping: addressesShipping?.streetName || '',
        postalCodeShipping: addressesShipping?.postalCode || '',
        defaultShippingAddress: defaultShippingAddressValue,
      });
    }
    setSelectedCountry(
      countryOptions.find(
        (option) => option.value === addressesShipping?.country
      ) || null
    );
  }, [
    addressesShipping?.city,
    addressesShipping?.country,
    addressesShipping?.postalCode,
    addressesShipping?.streetName,
    dataUser,
    defaultShippingAddressValue,
    reset,
  ]);

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 3000);
  }

  const onSubmit: SubmitHandler<AddressInfoData> = async (data) => {
    try {
      if (dataUser) {
        const setAddress: CustomerChangeAddressAction = {
          action: 'changeAddress',
          addressId: addressesShipping?.id || '',
          address: {
            country: data?.countryShipping,
            city: data?.cityShipping,
            streetName: data?.streetNameShipping,
            postalCode: data?.postalCodeShipping,
          },
        };
        const setDefaultAddress: CustomerSetDefaultShippingAddressAction = {
          action: 'setDefaultShippingAddress',
          addressId: data.defaultShippingAddress
            ? addressesShipping?.id
            : undefined,
        };

        const updateData = {
          version: dataUser?.version,
          actions: [setAddress, setDefaultAddress],
        };

        const updatedCustomer = await updateCustomer(dataUser.id, updateData);
        setDataUser(updatedCustomer);

        setIsEdit(false);
        setIsEditSuccess(true);
        removeMessage();
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  const handleInputClick = () => {
    setIsEdit(true);
  };

  return (
    <div className={classes.profileData__data}>
      {defaultShippingAddressValue ? (
        <span className={classes.default}>Default shipping address</span>
      ) : (
        ''
      )}
      <FormProvider {...methods}>
        <form
          className={classes.profileData__field}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div onClick={handleInputClick}>
            <CountrySelect
              control={control}
              name="countryShipping"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
              isDisabled={!isEdit}
            />
          </div>

          <div className={classes.input_container}>
            <City
              typeAddress="Shipping"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('cityShipping', value.target.value)}
            />

            <div className={classes.error_container}>
              {errors.cityShipping && (
                <span className="error">
                  {errors.cityShipping.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={classes.input_container}>
            <Street
              typeAddress="Shipping"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('streetNameShipping', value.target.value)
              }
            />

            <div className={classes.error_container}>
              {errors.streetNameShipping && (
                <span className="error">
                  {errors.streetNameShipping.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={classes.input_container}>
            <Postcode
              typeAddress="Shipping"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('postalCodeShipping', value.target.value)
              }
              selectedCountry={selectedCountry}
            />

            <div className={classes.error_container}>
              {errors.postalCodeShipping && (
                <span className="error">
                  {errors.postalCodeShipping.message as string}
                </span>
              )}
            </div>
          </div>
          <Checkbox
            label="Use as default address"
            {...register('defaultShippingAddress')}
            readOnly={!isEdit}
            onClick={handleInputClick}
            onChange={(e) =>
              setValue('defaultShippingAddress', e.target.checked)
            }
          />
          <Button
            type="submit"
            isFilled={true}
            isMain={true}
            disabled={!isEdit}
          >
            Save Changes
          </Button>

          <SuccessModal
            isOpen={isEditSuccess}
            onRequestClose={() => setIsEditSuccess(false)}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ShippingInfo;
