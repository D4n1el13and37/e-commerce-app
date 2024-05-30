import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { updateCustomerPassword } from '../../../../api/Customer/customer';
import { RootState } from '../../../../store/store';
import { setDataUser } from '../../../../store/customerSlice';

import Button from '../../../../components/ui/button/Button';
import SuccessModal from '../SuccesModal/SuccessModal';

import classes from '../../userProfile.module.scss';
import PasswordFieldEdit from '../../../../components/form/password/PasswordInputEdit';

interface PersonalInfoData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.customer.dataUser);

  const methods = useForm<PersonalInfoData>({
    mode: 'onChange',
  });

  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (dataUser) {
      reset({
        email: dataUser.email || '',
        // password: dataUser.password || '',
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
          dispatch(setDataUser(updatedCustomerPassword));
        }
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
          <div className={classes.input_container}>
            {/* <h3>Change password</h3> */}

            <PasswordFieldEdit
              label="Current Password"
              registerPassword="currentPassword"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) =>
                setValue('currentPassword', value.target.value)
              }
            />
          </div>
          <div className={classes.input_container}>
            <PasswordFieldEdit
              label="New Password"
              registerPassword="newPassword"
              readOnly={!isEdit}
              onClick={handleInputClick}
              onChange={(value) => setValue('newPassword', value.target.value)}
            />
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
