import React from 'react';

interface selectedCountry {
  name: string;
  regex: RegExp;
}

export interface AddressField {
  name?: string | undefined;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  selectedCountry?: selectedCountry | null;
}

export interface PersonalInfoProps {
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
