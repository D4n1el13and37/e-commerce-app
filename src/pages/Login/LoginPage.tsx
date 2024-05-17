import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/ui/button/Button';
import PasswordField from '../../components/form/password/PasswordInput';
import './LoginPage.scss';
import EmailInput from '../../components/form/email/EmailInput';
import { loginWithPassword } from '../../api/authMethods';

export interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const methods = useForm<LoginForm>({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  //   const onSubmit: SubmitHandler<LoginForm> = async (data) => {
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 1000);
  //     });
  //     console.log(data);
  //   };

  const [isError, setIsError] = useState('');
  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    loginWithPassword(data.email, data.password).catch((e) => {
      setIsError(e.message);
      removeError();
    });
  };

  return (
    <div className="login__container">
      {/* <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
        >
          <path
            d="M10.479 0.604004L2.02063 9.06238L10.479 17.5208"
            stroke="#758963"
            stroke-width="1.5"
          />
        </svg>
      </Button> */}
      <div className="headline">
        <h2>Welcome back!</h2>
        <span>Sign In to continue</span>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_container">
            <div className="input_container">
              <EmailInput />
              <div className="error_container">
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="input_container">
              <PasswordField />
              <div className="error_container">
                <span className="error">
                  {errors.password && errors.password.message}
                </span>
              </div>
            </div>
          </div>
          <div className="server_error">
            {isError && (
              <span className="error">
                The username or password is incorrect
              </span>
            )}
            <Button isFilled={true} disabled={isSubmitting} isMain={true}>
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginPage;
