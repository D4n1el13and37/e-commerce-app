import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../ui/input/Input';
import { PersonalInfoProps } from '../formInterface';

const DateBirth: React.FC<PersonalInfoProps> = ({ onClick, onChange }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      id="dateBirth"
      label="Date of Birth"
      type="date"
      onClick={onClick}
      error={
        errors.dateBirth ? (errors.dateBirth.message as string) : undefined
      }
      {...register('dateBirth', {
        required: 'Required',
        validate: (value: string) => {
          const minimumAge = 13;
          const dateToday = new Date();
          const dateBirth = new Date(value);

          if (dateBirth > dateToday) {
            return 'Cannot be in the future';
          }

          const userAge = dateToday.getFullYear() - dateBirth.getFullYear();
          const isBirthdayPassed =
            dateToday.getMonth() > dateBirth.getMonth() ||
            (dateToday.getMonth() === dateBirth.getMonth() &&
              dateToday.getDate() >= dateBirth.getDate());

          if (
            userAge < minimumAge ||
            (userAge === minimumAge && !isBirthdayPassed)
          ) {
            return 'Must be at least 13 years old';
          }
          return true;
        },
      })}
      onChange={onChange}
    />
  );
};

export default DateBirth;
