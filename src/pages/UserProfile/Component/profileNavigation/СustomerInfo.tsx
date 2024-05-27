import React, { useEffect, useState } from 'react';
import {
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomer } from '../../../../api/Customer/customer';
import { ProfileInfoProps } from '../ProfileInfo';

import Input from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';

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
    register,
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
        JSON.stringify(updatedCustomer);
        setDataUser(updatedCustomer);
        // console.log('Customer updated:', updatedCustomer);
      }
      setIsEdit(false);
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
      <form
        className={classes.profileData__field}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.input_container}>
          <Input
            id="firstName"
            autoComplete="firstName"
            label="First Name"
            type="text"
            readOnly={!isEdit}
            onClick={handleInputClick}
            {...register('firstName', {
              required: 'Required',
              minLength: {
                value: 1,
                message: 'At least 1 character',
              },
              validate: (value: string) => {
                const regexFirstName = /^[a-zA-Z]+$/;
                if (!regexFirstName.test(value)) {
                  return 'Only latin letters';
                }
                return true;
              },
            })}
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
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            readOnly={!isEdit}
            onClick={handleInputClick}
            {...register('lastName', {
              required: 'Required',
              minLength: {
                value: 1,
                message: 'At least 1 character',
              },
              validate: (value: string) => {
                const regexLastName = /^[a-zA-Z]+$/;
                if (!regexLastName.test(value)) {
                  return 'Only latin letters';
                }
                return true;
              },
            })}
            onChange={(value) => setValue('lastName', value.target.value)}
          />
          <div className={classes.error_container}>
            {errors.lastName && (
              <span className="error">{errors.lastName.message as string}</span>
            )}
          </div>
        </div>
        <div className={classes.input_container}>
          <Input
            id="dateBirth"
            label="Date of Birth"
            type="date"
            readOnly={!isEdit}
            onClick={handleInputClick}
            {...register('dateBirth', {
              required: 'Required',
              validate: (value: string) => {
                const minimumAge = 13;
                const dateToday = new Date();
                const dateBirth = new Date(value);

                if (dateBirth > dateToday) {
                  return 'Cannot be in the future';
                }

                const userAge =
                  dateToday.getFullYear() - dateBirth.getFullYear();
                const isBirthdayPassed =
                  dateToday.getMonth() > dateBirth.getMonth() ||
                  (dateToday.getMonth() === dateBirth.getMonth() &&
                    dateToday.getDate() >= dateBirth.getDate());

                if (
                  userAge < minimumAge ||
                  (userAge === minimumAge && !isBirthdayPassed)
                ) {
                  return 'Must be at least 13 years old';
                }
                return true;
              },
            })}
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

        <Button type="submit" isFilled={true} isMain={true} disabled={!isEdit}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default CustomerInfo;
