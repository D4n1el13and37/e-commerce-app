import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export interface CountryOption {
  label: string;
  value: string;
  regex: RegExp;
  lengthPostalcode: number;
}

interface countryType {
  flag: string;
  name: { common: string };
  postalCode: { regex: string | RegExp; format: string };
}

interface Props {
  onCountryChange: (selectedOption: CountryOption) => {};
}

export const CountrySelect = ({ onCountryChange }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleCountryChange = (selectedOption: CountryOption) => {
    onCountryChange(selectedOption);
    setInputValue(selectedOption.label);
    console.log('selectedOption', selectedOption);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      const fetchCountries = async () => {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${inputValue}`
        );
        if (response.ok) {
          const countries = await response.json();
          const options = countries.map((country: countryType) => ({
            label: `${country.flag} ${country.name.common}`,
            regex: country.postalCode
              ? new RegExp(country.postalCode.regex)
              : null,
            lengthPostalcode: country.postalCode
              ? country.postalCode.format.length
              : undefined,
          }));
          setCountryOptions(options);
        } else {
          setCountryOptions([]);
        }
      };
      fetchCountries();
    }
  }, [inputValue]);

  return (
    <Select
      options={countryOptions}
      onInputChange={handleInputChange}
      onChange={handleCountryChange}
      placeholder="Select a country"
    />
  );
};
