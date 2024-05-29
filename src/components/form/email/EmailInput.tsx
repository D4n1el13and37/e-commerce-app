import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../ui/input/Input';

interface EditProps {
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EditProps> = () => {
  const {
    register,
    formState: { errors },
    readOnly,
    onClick,
    onChange,
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
          const [localPart, domain] = value.split('@');

          if (!value.includes('@')) {
            return 'Email should contain @';
          }
          if (!localPart || !domain) {
            return 'Email should have a valid format';
          }
          if (value.endsWith('@')) {
            return 'Email should not end with @';
          }

          if (/[а-яА-ЯёЁ]/.test(value)) {
            return 'Email should not contain Cyrillic characters';
          }

          // Validate username
          if (!/^[a-zA-Z0-9]/.test(localPart)) {
            return 'Invalid username';
          }
          if (!/[a-zA-Z0-9]$/.test(localPart)) {
            return 'Invalid username';
          }
          if (/[^a-zA-Z0-9._-]/.test(localPart)) {
            return 'Username contains invalid characters';
          }
          if (/(\.\.|__|--|[._-]{2})/.test(localPart)) {
            return 'Invalid sequence of special characters';
          }

          // Validate domain
          if (
            !/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)
          ) {
            return 'Domain should have a valid format';
          }
          if (/(\.\.|--|[-.]{2})/.test(domain)) {
            return 'Invalid sequence of special characters';
          }
          if (/\s/.test(value)) {
            return 'Email should not contain spaces';
          }

          return true;
        },
      })}
    />
  );
};

export default EmailInput;
