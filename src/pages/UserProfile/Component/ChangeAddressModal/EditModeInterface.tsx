export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface DataAddress extends Address {
  id: string;
}

export interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  address?: DataAddress;
}
