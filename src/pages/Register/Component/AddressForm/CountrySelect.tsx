import { Control, Controller, FieldValues } from 'react-hook-form';
import Select from 'react-select';

import './CountrySelect.scss';

export interface CountryOption {
  name: string;
  label: string;
  value: string;
  regex: RegExp;
  lengthPostalcode: number | undefined;
}

interface CountrySelectProps {
  control: Control<FieldValues>;
  name: string;
  setSelectedCountry: (country: CountryOption | null) => void;
  value: CountryOption | null;
}

const countryOptions: CountryOption[] = [
  {
    name: 'United States',
    label: '🇺🇸 United States',
    value: 'US',
    regex: /^[0-9]{5}(-[0-9]{4})?$/,
    lengthPostalcode: 5,
  },
  {
    name: 'Canada',
    label: '🇨🇦 Canada',
    value: 'CA',
    regex: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    lengthPostalcode: 6,
  },
  {
    name: 'Germany',
    label: '🇩🇪 Germany',
    value: 'DE',
    regex: /^\d{5}$/,
    lengthPostalcode: 5,
  },
  {
    name: 'France',
    label: '🇫🇷 France',
    value: 'FR',
    regex: /^\d{5}$/,
    lengthPostalcode: 5,
  },
  {
    name: 'Australia',
    label: '🇦🇺 Australia',
    value: 'AU',
    regex: /^\d{4}$/,
    lengthPostalcode: 4,
  },
];

export function CountrySelect({
  control,
  name,
  setSelectedCountry,
  value,
}: CountrySelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={countryOptions}
          placeholder="Select a country"
          value={value}
          onChange={(option) => {
            setSelectedCountry(option as CountryOption | null);
            field.onChange(option ? option.value : '');
          }}
          classNamePrefix="react-select"
        />
      )}
    />
  );
}
