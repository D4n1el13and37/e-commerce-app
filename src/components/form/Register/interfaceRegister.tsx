import { useFormContext } from 'react-hook-form';

interface FormErrors {
  [key: string]: {
    message: string;
  };
}

export interface FormInfoProps {
  register: ReturnType<typeof useFormContext>['register'];
  errors: FormErrors;
}
