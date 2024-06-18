import React from 'react';

interface selectedCountry {
  name: string;
  regex: RegExp;
}

export interface AddressField {
  name: string;
  id: string;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  typeAddress?: 'Shipping' | 'Billing';
  selectedCountry?: selectedCountry | null;
}

export interface PersonalInfoProps {
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
