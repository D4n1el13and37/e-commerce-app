import React, { useEffect, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomerPassword } from '../../../../api/Customer/customer';
import { RootState } from '../../../../store/store';
import { setDataUser } from '../../../../store/customerSlice';

import Button from '../../../../components/ui/button/Button';

import classes from '../../userProfile.module.scss';
import PasswordFieldEdit from '../../../../components/form/password/PasswordInputEdit';
import { login, logout } from '../../../../store/authSlice';
import ModalRegistration from '../../../Register/Component/Modal/Modal';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';

interface PersonalInfoData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

const PersonalInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(
    (state: RootState) => state.customer.dataUser
  );

  const methods = useForm<PersonalInfoData>({
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = methods;

  useEffect(() => {
    if (dataUser) {
      reset({
        email: dataUser.email || '',
      });
    }
  }, [dataUser, reset]);

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState('');
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  function removeMessage() {
    setTimeout(() => setIsEditSuccess(false), 3000);
  }

  const onSubmit: SubmitHandler<PersonalInfoData> = async (data) => {
    try {
      if (dataUser) {
        if (data.currentPassword && data.newPassword) {
          const updateData = {
            version: dataUser.version,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          };

          const updatedCustomerPassword =
            await updateCustomerPassword(updateData);
          await dispatch(setDataUser(updatedCustomerPassword));
        }
      }

      setIsEdit(false);
      setIsEditSuccess(true);
      removeMessage();

      setTimeout(() => {
        dispatch(logout());
        dispatch(login({ email: data.email, password: data.newPassword }));
      }, 2000);
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
      }
    }
  };

  const handleInputClick = () => {
    setIsEdit(true);
  };

  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');

  useEffect(() => {
    trigger('currentPassword');
  }, [currentPassword, trigger]);

  useEffect(() => {
    trigger('newPassword');
  }, [newPassword, trigger]);

  return (
    <div className={classes.profileData__data}>
      <FormProvider {...methods}>
        <form
          className={classes.profileData__field}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.input_container}>
            <PasswordFieldEdit
              label="Current Password"
              registerPassword="currentPassword"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('currentPassword', value.target.value)
              }
            />
            <div className={classes.error_container}>
              {errors.currentPassword && (
                <span className="error">{errors.currentPassword.message}</span>
              )}
            </div>
          </div>

          <div className={classes.input_container}>
            <PasswordFieldEdit
              label="New Password"
              registerPassword="newPassword"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('newPassword', value.target.value)}
            />
            <div className={classes.error_container}>
              {errors.newPassword && (
                <span className="error">{errors.newPassword.message}</span>
              )}
            </div>
          </div>

          <div className={classes.server__error}>
            {isError && <span className="error">{isError}</span>}
            <Button
              type="submit"
              isFilled={true}
              isMain={true}
              disabled={!isEdit}
            >
              Save Changes
            </Button>
          </div>
          {/* <SuccessModal isOpen={isEditSuccess} /> */}
        </form>
      </FormProvider>
      <ModalRegistration
        header="Password successfully changed"
        subheader="You will be moved to the main page."
        isOpen={isEditSuccess}
        onRequestClose={() => setIsEditSuccess(false)}
      />
    </div>
  );
};
export default PersonalInfo;
