import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../ui/input/Input';

interface selectedCountry {
  name: string;
  regex: RegExp;
}

export interface AddressField {
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  typeAddress?: string;
  selectedCountry?: selectedCountry | null;
}

const City: React.FC<AddressField> = ({
  readOnly,
  onClick,
  onChange,
  typeAddress,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const nameId = `city${typeAddress}`;

  return (
    <Input
      id={nameId}
      label="City"
      type="text"
      placeholder="City"
      readOnly={readOnly}
      onClick={onClick}
      error={errors.nameId ? (errors.nameId.message as string) : undefined}
      {...register(nameId, {
        required: 'City must have at least 1 character',
        validate: (value: string) => {
          if (!/^[a-zA-Z]/.test(value)) {
            return 'Should start with latin latters';
          }
          if (/\s{2,}/.test(value)) {
            return `Only one " " is allowed between words`;
          }
          if (/--/.test(value)) {
            return `Only one "-" is allowed between words`;
          }
          if (!/^[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/.test(value)) {
            return `After a " " or "-" there should be a word`;
          }
          return true;
        },
      })}
      onChange={onChange}
    />
  );
};

export default City;
