import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../ui/input/Input';
import { AddressField } from '../../formInterface';
import classes from '../../styleForm.module.scss';

const Street: React.FC<AddressField> = ({ onClick, onChange, name, id }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const nameId = id as string;
  const errorMessage = errors[nameId]?.message as string | undefined;

  return (
    <div className={classes.input_container}>
      <Input
        id={nameId}
        label="Street"
        type="text"
        defaultValue={name}
        placeholder="Street"
        onClick={onClick}
        error={errors[nameId] ? (errors[nameId]?.message as string) : undefined}
        {...register(nameId, {
          required: 'Street must have at least 1 character',
          validate: (value) => {
            if (value.trim() === '') {
              return 'Street cannot consist of only spaces';
            }
            if (!/^[a-zA-Z0-9]/.test(value)) {
              return 'Should start with latin letters or digits';
            }
            if (/\s{2,}/.test(value)) {
              return `Only one space is allowed between words`;
            }
            return true;
          },
        })}
        onChange={onChange}
      />
      <div className={classes.error_container}>
        {errors[nameId] && <span className="error">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Street;
