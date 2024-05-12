import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import PasswordField from '../../components/form/PasswordInput';
import './LoginPage.scss';
// import Checkbox from './components/ui/checkbox/Checkbox';

export interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });
  //   const onSubmit: SubmitHandler<LoginForm> = async (data) => {
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 1000);
  //     });
  //     console.log(data);
  //   };
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    // console.log(data);
    JSON.stringify(data);
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
        <h2>Hello, Welcome back!</h2>
        <span>Sign In to continue</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_container">
          <div className="input_container">
            <Input
              type="text"
              label="Email address"
              id="email"
              placeholder="user@example.com"
              error={errors?.email?.message}
              {...register('email', {
                required: 'Email is requred',
                validate: (value) => {
                  if (!value.includes('@')) {
                    return 'Email should contain @';
                  }
                  if (!/^[^\s@]+/.test(value)) {
                    return 'Should contain a valid username';
                  }
                  if (/\s/.test(value)) {
                    return 'Email should not contain spaces';
                  }
                  if (!/\w+\.\w+/.test(value)) {
                    return 'Should contain a valid domain name';
                  }
                  return true;
                },
              })}
            />
            <div className="error_container">
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="input_container">
            <PasswordField register={register} errors={errors} />
            <div className="error_container">
              <span className="error">
                {errors.password && errors.password.message}
              </span>
            </div>
          </div>
        </div>
        <Button isFilled={true} disabled={isSubmitting} isMain={true}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
