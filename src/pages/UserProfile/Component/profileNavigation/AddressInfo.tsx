import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import {
  CustomerChangeAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomer } from '../../../../api/Customer/customer';
import { RootState } from '../../../../store/store';
import { setDataUser } from '../../../../store/customerSlice';

import classes from '../../userProfile.module.scss';
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
  countryBilling: string;
  cityBilling: string;
  streetNameBilling: string;
  postalCodeBilling: string;
  defaultBillingAddress: boolean;
}

interface AddressProps {
  addressType: 'Shipping' | 'Billing';
}

const AddressInfo: React.FC<AddressProps> = ({ addressType }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.customer.dataUser);

  const methods = useForm<AddressInfoData>({ mode: 'onChange' });
  const { control, handleSubmit, setValue, reset, trigger, register } = methods;

  const address = dataUser?.addresses[0];
  const defaultAddressValue = !!dataUser?.[`default${addressType}AddressId`];

  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOptionInterface> | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      trigger(`postalCode${addressType}`);
    }
  }, [addressType, selectedCountry, trigger]);

  useEffect(() => {
    if (dataUser) {
      reset({
        [`country${addressType}`]: address?.country || '',
        [`city${addressType}`]: address?.city || '',
        [`streetName${addressType}`]: address?.streetName || '',
        [`postalCode${addressType}`]: address?.postalCode || '',
        [`default${addressType}Address`]: defaultAddressValue,
      });
    }
    setSelectedCountry(
      countryOptions.find((option) => option.value === address?.country) || null
    );
  }, [
    address?.city,
    address?.country,
    address?.postalCode,
    address?.streetName,
    addressType,
    dataUser,
    defaultAddressValue,
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
          addressId: address?.id || '',
          address: {
            country: data[`country${addressType}`],
            city: data[`city${addressType}`],
            streetName: data[`streetName${addressType}`],
            postalCode: data[`postalCode${addressType}`],
          },
        };

        const setDefaultAddress:
          | CustomerSetDefaultBillingAddressAction
          | CustomerSetDefaultShippingAddressAction = {
          action: `setDefault${addressType}Address`,
          addressId: data[`default${addressType}Address`]
            ? address?.id
            : undefined,
        };

        const updateData = {
          version: dataUser?.version,
          actions: [setAddress, setDefaultAddress],
        };

        const updatedCustomer = await updateCustomer(dataUser.id, updateData);
        dispatch(setDataUser(updatedCustomer));

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
      {defaultAddressValue ? (
        <span className={classes.default}>Default {addressType} Address</span>
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
              name={`country${addressType}`}
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
              isDisabled={!isEdit}
            />
          </div>

          <City
            typeAddress={addressType}
            onClick={handleInputClick}
            onChange={(value) =>
              setValue(`city${addressType}`, value.target.value)
            }
          />

          <Street
            typeAddress={addressType}
            onClick={handleInputClick}
            onChange={(value) =>
              setValue(`streetName${addressType}`, value.target.value)
            }
          />

          <Postcode
            typeAddress={addressType}
            onClick={handleInputClick}
            onChange={(value) =>
              setValue(`postalCode${addressType}`, value.target.value)
            }
            selectedCountry={selectedCountry}
          />

          <Checkbox
            label={`Use as default ${addressType.toLowerCase()} address`}
            {...register(`default${addressType}Address`)}
            onClick={handleInputClick}
            onChange={(e) =>
              setValue(`default${addressType}Address`, e.target.checked)
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

export default AddressInfo;
