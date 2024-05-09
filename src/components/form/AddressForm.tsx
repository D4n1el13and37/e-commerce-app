import React, { useState } from 'react';
import Select from 'react-select';
import Checkbox from '../ui/checkbox/Checkbox';

export default function AddressForm({ register, errors }) {
  const countries = [
    { value: 'RUS', label: 'Russia', regex: /^\d{6}$/ },
    { value: 'UKR', label: 'Ukraine', regex: /^\d{5}$/ },
    { value: 'BLR', label: 'Belarus', regex: /^\d{6}$/ },
    { value: 'GER', label: 'Germany', regex: /^\d{5}$/ },
    { value: 'FRA', label: 'France', regex: /^\d{5}$/ },
    { value: 'ITA', label: 'Italy', regex: /^\d{5}$/ },
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
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
        <div></div>
        <Select
          {...register('country')}
          options={countries}
          onChange={handleCountryChange}
          placeholder="Select a country"
        />
        {console.log(selectedCountry)}
        <input
          {...register('postcode', {
            require: true,
            validate: (value) =>
              !selectedCountry ||
              selectedCountry.regex.test(value) ||
              'Invalid postcode for selected country',
          })}
          type="text"
          placeholder="Postcode"
        />
        {errors.postcode && <div>{errors.postcode.message}</div>}
      </div>

      <Checkbox label="Use as default address" />
    </div>
  );
}
