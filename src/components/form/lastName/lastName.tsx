import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../ui/input/Input';

interface LastNameProps {
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const LastName: React.FC<LastNameProps> = ({ readOnly, onClick, onChange }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      id="lastName"
      autoComplete="lastName"
      label="Last Name"
      type="text"
      readOnly={readOnly}
      onClick={onClick}
      error={errors.lastName ? (errors.lastName.message as string) : undefined}
      {...register('lastName', {
        required: 'Required',
        minLength: {
          value: 1,
          message: 'At least 1 character',
        },
        maxLength: {
          value: 50,
          message: 'Maximum length 50 character',
        },
        validate: (value: string) => {
          const regexFirstName = /^[a-zA-Z]+$/;
          if (!regexFirstName.test(value)) {
            return 'Only latin letters';
          }
          return true;
        },
      })}
      onChange={onChange}
    />
  );
};

export default LastName;
