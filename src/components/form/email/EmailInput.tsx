import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../ui/input/Input';

const EmailInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      type="text"
      label="Email address"
      autoComplete="email"
      id="email"
      placeholder="user@example.com"
      error={errors.email ? (errors.email.message as string) : undefined}
      {...register('email', {
        required: 'Email is required',
        validate: (value) => {
          const mailArray = value.split('@');
          if (!value.includes('@')) {
            return 'Email should contain @';
          }
          if (mailArray[0].length < 1 || /[^a-zA-Z0-9]+/.test(mailArray[0])) {
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
};

export default EmailInput;
