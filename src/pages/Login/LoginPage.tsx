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
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
                  return 'Email shoud contain @';
                }
                if (!/^[^\s@]+/.test(value)) {
                  return 'Email should contain a valid username';
                }
                if (/\s/.test(value)) {
                  return 'Email should not contain spaces';
                }
                if (!/\w+\.\w+/.test(value)) {
                  return 'Email should contain a valid domain name';
                }
                return true;
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <PasswordField register={register} errors={errors} />
          <span className="error">
            {errors.password && errors.password.message}
          </span>
        </div>
        <Button disabled={isSubmitting} isMain={true}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
