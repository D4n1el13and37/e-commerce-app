import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../ui/input/Input';
import { AddressField } from '../../formInterface';
import classes from '../../styleForm.module.scss';
import { CountryOptionInterface } from '../../../../pages/Register/Component/AddressForm/countryOptions';

interface PostcodeProps extends AddressField {
  selectedCountry: CountryOptionInterface | null;
}

const Postcode: React.FC<PostcodeProps> = ({
  onClick,
  onChange,
  name,
  id,
  selectedCountry,
}) => {
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
        label="Postcode"
        type="text"
        defaultValue={name}
        placeholder="Postcode"
        disabled={!selectedCountry}
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
      <div className={classes.error_container}>
        {errors[nameId] && <span className="error">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Postcode;
