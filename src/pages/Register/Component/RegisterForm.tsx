import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { loginAfterSuccesRegister, register } from '../../../store/authSlice';

import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../../components/ui/button/Button';
import Checkbox from '../../../components/ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';
import { RegisterFormFields } from './interfaceRegister';
import ModalRegistration from './Modal/Modal';
// import { getCart, getCreateCart } from '../../../store/cartSlice';

export default function RegisterForm() {
  const methods = useForm<RegisterFormFields>({
    mode: 'onChange',
    defaultValues: {
      email: 'test@example.com',
      password: '123Qwerty',
      firstName: 'Egor',
      lastName: 'Krit',
      dateBirth: '12-12-1212',
      streetShipping: 'Evkeoi',
      streetBilling: 'Evkeoi',
      cityShipping: 'Ninzghn',
      cityBilling: 'Ninzghn',
      postcodeShipping: '12312',
      postcodeBilling: '12312',
    },
  });
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
      await dispatch(register(userData)).unwrap();
      setIsSuccess(true);
      sessionStorage.setItem('newCustomerIndicator', 'true');

      /** idk why it's not work */
      await dispatch(
        loginAfterSuccesRegister({ email: data.email, password: data.password })
      ).unwrap();

      setTimeout(() => {
        navigate('/main', { replace: true });
      }, 1500);
    } catch (e) {
      if (typeof e === 'string') {
        setIsError(e);
        removeError();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.form__title}>Sign up</h2>
        <PersonalInfo />
        <ShippingAddress />
        {!isSameAddress && <BillingAddress />}

        <Checkbox
          label="Are the billing and shipping addresses the same?"
          checked={isSameAddress}
          onChange={handleCheckboxChange}
        />
        <div>
          <div className={classes.server__error}>
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
          <span className={classes.login}>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </form>
    </FormProvider>
  );
}
