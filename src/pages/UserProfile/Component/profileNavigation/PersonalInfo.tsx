import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerChangeEmailAction } from '@commercetools/platform-sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomer } from '../../../../api/Customer/customer';
import { RootState } from '../../../../store/store';
import { setDataUser } from '../../../../store/customerSlice';

import Button from '../../../../components/ui/button/Button';
import SuccessModal from '../SuccesModal/SuccessModal';

import classes from '../../userProfile.module.scss';
import EmailInput from '../../../../components/form/email/EmailInput';
import Input from '../../../../components/ui/input/Input';

interface PersonalInfoData {
  email: string;
  password: string;
}

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.customer.dataUser);

  const methods = useForm<PersonalInfoData>({
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
        password: dataUser.password || '',
      });
    }
  }, [dataUser, reset]);

  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 3000);
  }

  const onSubmit: SubmitHandler<PersonalInfoData> = async (data) => {
    try {
      if (dataUser) {
        const setFirstEmailAction: CustomerChangeEmailAction = {
          action: 'changeEmail',
          email: data.email,
        };

        const updateData = {
          version: dataUser?.version,
          actions: [setFirstEmailAction],
        };

        const updatedCustomer = await updateCustomer(dataUser.id, updateData);
        dispatch(setDataUser(updatedCustomer));
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
            <Input
              data-testid="password"
              label="Password"
              autoComplete="current-password"
              type="text"
              id="password"
              value={dataUser?.password}
            />
          </div>
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
export default PersonalInfo;
