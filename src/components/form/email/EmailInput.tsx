import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginForm } from '../../../pages/Login/LoginPage';
import Input from '../../ui/input/Input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

const EmailInput: React.FC<InputProps> = ({ register, errors }) => (
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
);

export default EmailInput;
