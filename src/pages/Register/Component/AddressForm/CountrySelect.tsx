import { Control, Controller, FieldValues } from 'react-hook-form';
import { SingleValue } from 'react-select';

import AsyncSelect from 'react-select/async';

import './CountrySelect.scss';

export interface CountryOption {
  name: string;
  label: string;
  value: string;
  regex: RegExp;
  lengthPostalcode: number;
}

interface countryType {
  cca2: string;
  flag: string;
  name: { common: string };
  postalCode: { regex: string | RegExp; format: string };
}

type countryValue = SingleValue<CountryOption> | null;

interface CountrySelectProps {
  control: Control<FieldValues>;
  name: string;
  setSelectedCountry: (country: countryValue) => void;
  value: countryValue;
}

export function CountrySelect({
  control,
  name,
  setSelectedCountry,
  value,
}: CountrySelectProps) {
  // function for loading data
  const loadCountry = async (inputValue: string) => {
    try {
      if (inputValue.length > 1) {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${inputValue}`
        );
        const data = await response.json();
        return data.map((country: countryType) => ({
          name: country.name.common,
          label: `${country.flag} ${country.name.common}`,
          value: country.cca2,
          regex: country.postalCode
            ? new RegExp(country.postalCode.regex)
            : null,
          lengthPostalcode: country.postalCode
            ? country.postalCode.format.length
            : undefined,
        }));
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
    return [];
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AsyncSelect
          {...field}
          cacheOptions
          defaultOptions
          loadOptions={loadCountry}
          placeholder="Select a country"
          value={value}
          onChange={(option) => {
            setSelectedCountry(option);
            field.onChange(option ? option.value : '');
          }}
          classNamePrefix="react-select"
        />
      )}
    />
  );
}
