import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../ui/input/Input';
import { AddressField } from '../city/city';

const Street: React.FC<AddressField> = ({
  readOnly,
  onClick,
  onChange,
  typeAddress,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const nameId = `streetName${typeAddress}`;

  return (
    <Input
      id={nameId}
      label="Street"
      type="text"
      placeholder="Street"
      readOnly={readOnly}
      onClick={onClick}
      error={errors.nameId ? (errors.nameId.message as string) : undefined}
      {...register(nameId, {
        required: 'Street must have at least 1 character',
      })}
      onChange={onChange}
    />
  );
};

export default Street;
