import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomerChangeEmailAction,
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomer } from '../../../../api/Customer/customer';
import { RootState } from '../../../../store/store';
import { setDataUser } from '../../../../store/customerSlice';

import Button from '../../../../components/ui/button/Button';
import SuccessModal from '../SuccesModal/SuccessModal';
import FirstName from '../../../../components/form/firstName/firstName';
import LastName from '../../../../components/form/lastName/lastName';
import DateBirth from '../../../../components/form/dateBirth/dateBirth';

import classes from '../../userProfile.module.scss';
import EmailInput from '../../../../components/form/email/EmailInput';

interface CustomerInfoData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
}

const CustomerInfo: React.FC = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.customer.dataUser);

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
        email: dataUser.email || '',
        firstName: dataUser.firstName || '',
        lastName: dataUser.lastName || '',
        dateBirth: dataUser.dateOfBirth || '',
      });
    }
  }, [dataUser, reset]);

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState('');
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 3000);
  }

  const onSubmit: SubmitHandler<CustomerInfoData> = async (data) => {
    try {
      if (dataUser) {
        const setFirstEmailAction: CustomerChangeEmailAction = {
          action: 'changeEmail',
          email: data.email,
        };

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
            setFirstEmailAction,
            setFirstNameAction,
            setLastNameAction,
            setDateOfBirthAction,
          ],
        };

        const updatedCustomer = await updateCustomer(dataUser.id, updateData);
        dispatch(setDataUser(updatedCustomer));
      }
      setIsEdit(false);
      setIsEditSuccess(true);
      removeMessage();
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
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
          {' '}
          <div className={classes.input_container}>
            <EmailInput
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('email', value.target.value)}
            />
            <div className={`${classes.error_container}`}>
              {errors.email && (
                <span className="error">{errors.email.message as string}</span>
              )}
            </div>
          </div>
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
          <div className={classes.server__error}>
            {isError && (
              <span className="error">
                There is already an existing customer with the provided email
              </span>
            )}
            <Button
              type="submit"
              isFilled={true}
              isMain={true}
              disabled={!isEdit}
            >
              Save Changes
            </Button>
          </div>
          <SuccessModal
            isOpen={isEditSuccess}
            onRequestClose={() => setIsEditSuccess(false)}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomerInfo;
