import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../ui/input/Input';
import { AddressField } from '../city/city';

const Postcode: React.FC<AddressField> = ({
  readOnly,
  onClick,
  onChange,
  typeAddress,
  selectedCountry,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const nameId = `postalCode${typeAddress}`;

  return (
    <Input
      id={nameId}
      label="Postcode"
      type="text"
      placeholder="Postcode"
      disabled={!selectedCountry}
      readOnly={readOnly}
      onClick={onClick}
      error={errors[nameId] ? (errors[nameId]?.message as string) : undefined}
      {...register(nameId, {
        required: 'Postcode is required',
        validate: (value) => {
          if (selectedCountry && !selectedCountry.regex.test(value)) {
            return `Invalid postcode format for ${selectedCountry.name}`;
          }
          return true;
        },
      })}
      onChange={onChange}
    />
  );
};

export default Postcode;
