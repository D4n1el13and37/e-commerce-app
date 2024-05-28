import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import {
  CustomerChangeAddressAction,
  CustomerSetDefaultBillingAddressAction,
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
  countryBilling: string;
  cityBilling: string;
  streetNameBilling: string;
  postalCodeBilling: string;
  defaultBillingAddress: boolean;
}

const BillingInfo: React.FC<ProfileInfoProps> = ({ dataUser, setDataUser }) => {
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

  const addressesBilling = dataUser?.addresses[1];
  const defaultBillingAddressValue = !!dataUser?.defaultBillingAddressId;

  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOptionInterface> | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      trigger('postalCodeBilling');
    }
  }, [selectedCountry, trigger]);

  useEffect(() => {
    if (dataUser) {
      reset({
        countryBilling: addressesBilling?.country || '',
        cityBilling: addressesBilling?.city || '',
        streetNameBilling: addressesBilling?.streetName || '',
        postalCodeBilling: addressesBilling?.postalCode || '',
        defaultBillingAddress: defaultBillingAddressValue,
      });
    }
    setSelectedCountry(
      countryOptions.find(
        (option) => option.value === addressesBilling?.country
      ) || null
    );
  }, [
    addressesBilling?.city,
    addressesBilling?.country,
    addressesBilling?.postalCode,
    addressesBilling?.streetName,
    dataUser,
    defaultBillingAddressValue,
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
          addressId: addressesBilling?.id || '',
          address: {
            country: data?.countryBilling,
            city: data?.cityBilling,
            streetName: data?.streetNameBilling,
            postalCode: data?.postalCodeBilling,
          },
        };
        const setDefaultAddress: CustomerSetDefaultBillingAddressAction = {
          action: 'setDefaultBillingAddress',
          addressId: data.defaultBillingAddress
            ? addressesBilling?.id
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
      {defaultBillingAddressValue ? (
        <span className={classes.default}>Default Billing address</span>
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
              name="countryBilling"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
              isDisabled={!isEdit}
            />
          </div>

          <div className={classes.input_container}>
            <City
              typeAddress="Billing"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('cityBilling', value.target.value)}
            />

            <div className={classes.error_container}>
              {errors.cityBilling && (
                <span className="error">
                  {errors.cityBilling.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={classes.input_container}>
            <Street
              typeAddress="Billing"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('streetNameBilling', value.target.value)
              }
            />

            <div className={classes.error_container}>
              {errors.streetNameBilling && (
                <span className="error">
                  {errors.streetNameBilling.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={classes.input_container}>
            <Postcode
              typeAddress="Billing"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('postalCodeBilling', value.target.value)
              }
              selectedCountry={selectedCountry}
            />

            <div className={classes.error_container}>
              {errors.postalCodeBilling && (
                <span className="error">
                  {errors.postalCodeBilling.message as string}
                </span>
              )}
            </div>
          </div>
          <Checkbox
            label="Use as default address"
            {...register('defaultBillingAddress')}
            readOnly={!isEdit}
            onClick={handleInputClick}
            onChange={(e) =>
              setValue('defaultBillingAddress', e.target.checked)
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

export default BillingInfo;
