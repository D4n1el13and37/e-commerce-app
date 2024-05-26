import cn from 'classnames';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../components/ui/input/Input';
import { UserProps } from '../UserInfo';

import classes from '../../userProfile.module.scss';
import Button from '../../../../components/ui/button/Button';

interface CustomerInfoData {
  firstName: string;
  lastName: string;
  dateBirth: string;
}

const CustomerInfo: React.FC<UserProps> = ({ dataUser }) => {
  const methods = useForm<CustomerInfoData>({
    mode: 'onChange',
    defaultValues: {
      firstName: dataUser?.firstName || '',
      lastName: dataUser?.lastName || '',
      dateBirth: dataUser?.dateOfBirth || '',
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit: SubmitHandler<CustomerInfoData> = async (data) => {
    console.log(data);
    setIsEditing(false);
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
          <Input id="lastName" label="Last Name" type="text" />
        </div>
        <Input id="dateBirth" label="Date of Birth" type="date" />
      </form>
      <Button isFilled={true} isMain={true}>
        {' '}
        onS Save Change
      </Button>
    </div>
  );
};

export default CustomerInfo;
