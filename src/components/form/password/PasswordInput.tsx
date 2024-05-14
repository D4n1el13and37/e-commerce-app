import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import pass from './Password.module.scss';
import { LoginForm } from '../../../pages/Login/LoginPage';
import Input from '../../ui/input/Input';
import validatePassword from './validatePassword';
import TooggleVisibilityButton from './TooggleVisibilityButton';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

const PasswordField: React.FC<InputProps> = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassworVisibility = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setShowPassword(!showPassword);
      e.preventDefault();
    },
    [showPassword]
  );

  return (
    <div className={pass.container} data-testid="password-container">
      <Input
        data-testid="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        placeholder="Enter password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is requred',
          minLength: {
            value: 8,
            message: 'Password shoud be longer than 8 symbols',
          },
          validate: validatePassword,
        })}
      />
      <TooggleVisibilityButton
        showPassword={showPassword}
        onClick={togglePassworVisibility}
      />
    </div>
  );
};

export default PasswordField;
