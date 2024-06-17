import { useState } from 'react';
import { /* useLocation , */ Link, useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import Button from '../../components/ui/button/Button';
import PasswordField from '../../components/form/password/PasswordInput';
import cl from './LoginPage.module.scss';
import EmailInput from '../../components/form/email/EmailInput';
import { login } from '../../store/authSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import GoBackButton from '../../components/form/goBack/GoBackButton';

export interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); //
  // const location = useLocation(); // to save where we were(for navigating)
  const [isError, setIsError] = useState('');
  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const methods = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      email: 'cainowa123@gmail.com',
      password: 'Qwerty1234',
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/main', { replace: true });
    } catch (e) {
      if (typeof e === 'string') {
        setIsError(e);
        removeError();
      }
    }
  };

  return (
    <section className={`container`}>
      <div className={cn('grid', cl.login)}>
        <GoBackButton />
        <div className={cl.login__container}>
          <div className={cl.headline}>
            <h2>Welcome back!</h2>
            <span>Sign In to continue</span>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={cl.form__container}>
                <div className={cl.input__container}>
                  <EmailInput />
                  <div className={cl.error__container}>
                    {errors.email && (
                      <span className={`error`}>{errors.email.message}</span>
                    )}
                  </div>
                </div>
                <div className={cl.input__container}>
                  <PasswordField />
                  <div className={cl.error__container}>
                    <span className={`error`}>
                      {errors.password && errors.password.message}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className={cl.server__error}>
                  {isError && (
                    <span className={`error`}>
                      The username or password is incorrect
                    </span>
                  )}
                  <Button isFilled={true} disabled={isSubmitting} isMain={true}>
                    {isSubmitting ? 'Loading...' : 'Submit'}
                  </Button>
                </div>
                <span className={cl.register}>
                  Do not have an account? <Link to="/register">Sign Up</Link>
                </span>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
