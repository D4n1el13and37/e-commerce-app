import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../ui/input/Input';
import { PersonalInfoProps } from '../formInterface';

const FirstName: React.FC<PersonalInfoProps> = ({ onClick, onChange }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      id="firstName"
      autoComplete="firstName"
      label="First Name"
      type="text"
      onClick={onClick}
      error={
        errors.firstName ? (errors.firstName.message as string) : undefined
      }
      {...register('firstName', {
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

export default FirstName;
