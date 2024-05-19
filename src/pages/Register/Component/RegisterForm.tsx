import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
  const methods = useForm<RegisterFormFields>({
    mode: 'onChange',
    // defaultValues: {
    //   email: 'test@example.com',
    //   password: '123Qwerty',
    //   firstName: 'Egor',
    //   lastName: 'Krit',
    //   dateBirth: '12-12-1212',
    //   streetShipping: 'Evkeoi',
    //   streetBilling: 'Evkeoi',
    //   cityShipping: 'Ninzghn',
    //   cityBilling: 'Ninzghn',
    //   postcodeShipping: '123123',
    //   postcodeBilling: '123123',
    //   countryShipping: 'Russia',
    //   countryBilling: 'Russia',
    // },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { isAuthorized, isLoading, error } = useAppSelector(
  //   (state) => state.auth
  // );

  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      await dispatch(register(data)).unwrap();
      setIsSuccess(true);
      await dispatch(
        login({ email: data.email, password: data.password })
      ).unwrap();
      navigate('/main', { replace: true });
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
        <div className={`${classes.form__addresses}`}>
          <ShippingAddress />
          <BillingAddress />
        </div>
        <Checkbox
          label="Are the billing and shipping addresses the same?"
          isChecked={true}
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
