import React, { useEffect, useState } from 'react';
import {
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomer } from '../../../../api/Customer/customer';
import { ProfileInfoProps } from '../ProfileInfo';

import Button from '../../../../components/ui/button/Button';
import SuccesModal from '../SuccesModal/SuccessModal';
import FirstName from '../../../../components/form/firstName/firstName';
import LastName from '../../../../components/form/lastName/lastName';
import DateBirth from '../../../../components/form/dateBirth/dateBirth';

import classes from '../../userProfile.module.scss';

interface CustomerInfoData {
  firstName: string;
  lastName: string;
  dateBirth: string;
}

const CustomerInfo: React.FC<ProfileInfoProps> = ({
  dataUser,
  setDataUser,
}) => {
  const methods = useForm<CustomerInfoData>({
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (dataUser) {
      reset({
        firstName: dataUser.firstName || '',
        lastName: dataUser.lastName || '',
        dateBirth: dataUser.dateOfBirth || '',
      });
    }
  }, [dataUser, reset]);

  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 3000);
  }

  const onSubmit: SubmitHandler<CustomerInfoData> = async (data) => {
    try {
      if (dataUser) {
        const setFirstNameAction: CustomerSetFirstNameAction = {
          action: 'setFirstName',
          firstName: data.firstName,
        };
        const setLastNameAction: CustomerSetLastNameAction = {
          action: 'setLastName',
          lastName: data.lastName,
        };
        const setDateOfBirthAction: CustomerSetDateOfBirthAction = {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateBirth,
        };

        const updateData = {
          version: dataUser?.version,
          actions: [
            setFirstNameAction,
            setLastNameAction,
            setDateOfBirthAction,
          ],
        };

        const updatedCustomer = await updateCustomer(dataUser.id, updateData);
        setDataUser(updatedCustomer);
      }
      setIsEdit(false);
      setIsEditSuccess(true);
      removeMessage();
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
      <FormProvider {...methods}>
        <form
          className={classes.profileData__field}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.input_container}>
            <FirstName
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('firstName', value.target.value)}
            />
            <div className={`${classes.error_container}`}>
              {errors.firstName && (
                <span className="error">
                  {errors.firstName.message as string}
                </span>
              )}
            </div>
          </div>
          <div className={classes.input_container}>
            <LastName
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('lastName', value.target.value)}
            />
            <div className={classes.error_container}>
              {errors.lastName && (
                <span className="error">
                  {errors.lastName.message as string}
                </span>
              )}
            </div>
          </div>
          <div className={classes.input_container}>
            <DateBirth
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('dateBirth', value.target.value)}
            />
            <div className={classes.error_container}>
              {errors.dateBirth && (
                <span className="error">
                  {errors.dateBirth.message as string}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            isFilled={true}
            isMain={true}
            disabled={!isEdit}
          >
            Save Changes
          </Button>
          <SuccesModal
            isOpen={isEditSuccess}
            onRequestClose={() => setIsEditSuccess(false)}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomerInfo;
