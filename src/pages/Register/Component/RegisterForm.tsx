import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../../components/ui/button/Button';
import Checkbox from '../../../components/ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';
import { RegisterFormFields } from './interfaceRegister';
import { RegistartionUser } from '../../../api/authMethods';
import ModalRegistration from './Modal/Modal';

export default function RegisterForm() {
  const methods = useForm<RegisterFormFields>({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState('');
  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      await RegistartionUser(data);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      removeError();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={`${classes.form}`} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={`${classes.form__title}`}>Sign up</h2>
        <PersonalInfo />
        <div className={`${classes.form__addresses}`}>
          <ShippingAddress />
          <BillingAddress />
        </div>
        <Checkbox
          label="Are the billing and shipping addresses the same?"
          isChecked={true}
        />
        <div className="server_error">
          {isError && (
            <span className="error">
              There is already an existing customer with the provided email
            </span>
          )}
          <Button isFilled={true} disabled={isSubmitting} isMain={true}>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </Button>

          <ModalRegistration
            isOpen={isSuccess}
            onRequestClose={() => setIsSuccess(false)}
          />
        </div>
      </form>
    </FormProvider>
  );
}
