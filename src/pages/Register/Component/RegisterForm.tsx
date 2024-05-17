import { FormProvider, useForm } from 'react-hook-form';
import { CustomerDraft, MyCustomerDraft } from '@commercetools/platform-sdk';

import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../../components/ui/button/Button';
import Checkbox from '../../../components/ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';
import { RegisterFormFields } from './interfaceRegister';

export default function RegisterForm() {
  const methods = useForm<RegisterFormFields>({ mode: 'onBlur' });
  const { handleSubmit } = methods;
  const onSubmit = async (data: RegisterFormFields) => {
    // const newCustomerDetails: MyCustomerDraft = {
    //   email: data.email,
    //   password: data.password,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   // addresses: [
    //   //   {
    //   //     key: 'shipping',
    //   //     streetName: data.streetShipping,
    //   //     city: data.cityShipping,
    //   //     postalCode: data.postcodeShipping,
    //   //     country: data.countryShipping,
    //   //   },
    //   //   {
    //   //     key: 'billing',
    //   //     streetName: data.streetBilling,
    //   //     city: data.cityBilling,
    //   //     postalCode: data.postcodeBilling,
    //   //     country: data.countryBilling,
    //   //   },
    //   // ],
    //   // defaultBillingAddress: 1,
    //   // defaultShippingAddress: 0,
    // };
    // try {
    //   const request = await getApiRoot()
    //     .withProjectKey({ projectKey })
    //     // .me()
    //     // .signup()
    //     .customers()
    //     .post({ body: newCustomerDetails })
    //     .execute();
    //   const newCustomer = request.body.customer;
    //   console.log('User created:', newCustomer);
    // } catch (e) {
    //   if (e instanceof Error) {
    //     throw new Error(e.message);
    //   } else {
    //     throw new Error('An unknown error occurred');
    //   }
    // }
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

        <Button type="submit" isMain={true} isFilled={true}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
