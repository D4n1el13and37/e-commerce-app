import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select from 'react-select';

import './CountrySelect.scss';
import { CountryOptionInterface, countryOptions } from './countryOptions';

interface CountrySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setSelectedCountry: (country: CountryOptionInterface | null) => void;
  value: CountryOptionInterface | null;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function CountrySelect<T extends FieldValues>({
  control,
  name,
  setSelectedCountry,
  value,
  isDisabled,
  onClick,
}: CountrySelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div onClick={onClick}>
          <Select
            {...field}
            options={countryOptions}
            placeholder="Select a country"
            value={value}
            onChange={(option) => {
              setSelectedCountry(option as CountryOptionInterface | null);
              field.onChange(option ? option.value : '');
            }}
            classNamePrefix="react-select"
            isDisabled={isDisabled}
          />
        </div>
      )}
    />
  );
}
