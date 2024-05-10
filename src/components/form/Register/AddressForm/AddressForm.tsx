import React, { useState } from 'react';
import Checkbox from '../../../ui/checkbox/Checkbox';
import { CountrySelect, CountryOption } from './CountrySelect';
import { FormInfoProps } from '../interfaceRegister';

export default function AddressForm({ register, errors }: FormInfoProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  const handleCountryChange = (selectedOption: CountryOption) => {
    setSelectedCountry(selectedOption);
    console.log('selectedOption', selectedOption);
  };

  return (
    <div>
      <div>
        <input
          {...register('city', {
            required: 'Street must have at least 1 character',
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Street name must contain only letters',
            },
          })}
          type="text"
          placeholder="City"
        />
        {errors.city && <p>{errors.city.message}</p>}
        <input
          {...register('street', {
            required: 'Street must have at least 1 character',
          })}
          type="text"
          placeholder="Street"
        />
        {errors.street && <p>{errors.street.message}</p>}

        <div className="">
          <CountrySelect onCountryChange={handleCountryChange} />
          <input
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
            type="text"
            placeholder="Postcode"
            disabled={!selectedCountry}
          />
          {errors.postcode && <div>{errors.postcode.message}</div>}
        </div>
      </div>

      <Checkbox label="Use as default address" />
    </div>
  );
}
