import React, { useState } from 'react';
import Checkbox from '../../../ui/checkbox/Checkbox';
import { CountrySelect, CountryOption } from './CountrySelect';
import { FormInfoProps } from '../interfaceRegister';
import classes from '../Rigister.module.scss';
import Input from '../../../ui/input/Input';

export default function AddressForm({ register, errors }: FormInfoProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  const handleCountryChange = (selectedOption: CountryOption) => {
    setSelectedCountry(selectedOption);
    console.log('selectedOption', selectedOption);
  };

  return (
    <div className={`${classes.address}`}>
      <div className={`${classes.address__information}`}>
        <CountrySelect onCountryChange={handleCountryChange} />

        <Input
          {...register('street', {
            required: 'Street must have at least 1 character',
          })}
          id="Street"
          fieldName="Street"
          type="text"
          placeholder="Street"
          onChange={(value) => value}
        />
        {errors.street && (
          <div className={`${classes.error}`}>{errors.street.message}</div>
        )}

        <div className={`${classes.address__code}`}>
          <Input
            {...register('city', {
              required: 'Street must have at least 1 character',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Street name must contain only letters',
              },
            })}
            id="city"
            fieldName="City"
            type="text"
            placeholder="City"
            onChange={(value) => value}
          />
          {errors.city && (
            <div className={`${classes.error}`}>{errors.city.message}</div>
          )}

          <Input
            {...register('postcode', {
              required: selectedCountry != null,
              validate: (value) => {
                if (
                  selectedCountry &&
                  selectedCountry.regex.test(value) &&
                  value.length === selectedCountry.lengthPostalcode
                ) {
                  return 'Invalid postcode for this country';
                }
                return true;
              },
            })}
            id="postcode"
            fieldName="Postcode"
            type="text"
            placeholder="Postcode"
            disabled={!selectedCountry}
            onChange={(value) => value}
          />
          {errors.postcode && (
            <div className={`${classes.error}`}>{errors.postcode.message}</div>
          )}
        </div>
      </div>

      <Checkbox label="Use as default address" />
    </div>
  );
}
