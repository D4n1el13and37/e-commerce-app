import React, { InputHTMLAttributes, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import inputClasses from '../ui/input/Input.module.scss';
import pass from './Password.module.scss';
import { LoginForm } from '../../pages/Login/LoginPage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

const PasswordField: React.FC<InputProps> = ({
  register,
  errors,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={inputClasses.container} data-testid="password-container">
      <label htmlFor={'password'} className={inputClasses.label}>
        Password
      </label>
      <div className={pass.container}>
        <input
          data-testid="password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Enter password"
          className={`${inputClasses.input} ${errors.password && 'error'}`}
          {...props}
          {...register('password', {
            required: 'Password is requred',
            minLength: {
              value: 8,
              message: 'Password shoud be longer than 8 symbols',
            },
            validate: (value) => {
              if (/\s/.test(value)) {
                return 'Password should not contain spaces';
              }
              if (!value.match(/[A-Z]/)) {
                return 'Should contain 1 uppercase letter at least';
              }
              if (!value.match(/[a-z]/)) {
                return 'Should contain 1 lowercase letter at least';
              }
              if (!value.match(/[0-9]/)) {
                return 'Should contain a number';
              }
              return true;
            },
          })}
        />
        <label htmlFor="clear" className={pass.clear}>
          <input
            id="clear"
            type="checkbox"
            onChange={(e) => {
              setShowPassword(!showPassword);
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default PasswordField;
