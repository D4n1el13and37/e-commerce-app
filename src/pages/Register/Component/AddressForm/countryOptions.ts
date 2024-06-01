export interface CountryOptionInterface {
  name: string;
  label: string;
  value: string;
  regex: RegExp;
  lengthPostalcode: number | undefined;
}

export const countryOptions: CountryOptionInterface[] = [
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
