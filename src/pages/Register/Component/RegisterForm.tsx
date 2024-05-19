import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { login, register } from '../../../store/authSlice';

import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../../components/ui/button/Button';
import Checkbox from '../../../components/ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';
import { RegisterFormFields } from './interfaceRegister';
// import { RegistartionUser, loginWithPassword } from '../../../api/authMethods';
import ModalRegistration from './Modal/Modal';

export default function RegisterForm() {
  const methods = useForm<RegisterFormFields>({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState('');

  const [isSameAddress, setSameAddress] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const handleCheckboxChange = () => {
    setSameAddress(!isSameAddress);
  };

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const userData = { ...data };

    if (isSameAddress) {
      userData.streetBilling = userData.streetShipping;
      userData.cityBilling = userData.cityShipping;
      userData.postcodeBilling = userData.postcodeShipping;
      userData.countryBilling = userData.countryShipping;
    }

    try {
      await dispatch(register(data)).unwrap();
      setIsSuccess(true);

      await setTimeout(() => {
        dispatch(
          login({ email: data.email, password: data.password })
        ).unwrap();
        navigate('/main', { replace: true });
      }, 1000);
    } catch (e) {
      if (typeof e === 'string') {
        setIsError(e);
        removeError();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={`${classes.form}`} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={`${classes.form__title}`}>Sign up</h2>
        <PersonalInfo />
        <ShippingAddress />
        {!isSameAddress && <BillingAddress />}

        <Checkbox
          label="Are the billing and shipping addresses the same?"
          checked={isSameAddress}
          onChange={handleCheckboxChange}
        />
        <div className="server_error">
          {isError && (
            <span className="error">
              There is already an existing customer with the provided email
            </span>
          )}
          <Button isFilled={true} disabled={isSubmitting} isMain={true}>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </Button>

          <ModalRegistration
            isOpen={isSuccess}
            onRequestClose={() => setIsSuccess(false)}
          />
        </div>
      </form>
    </FormProvider>
  );
}
