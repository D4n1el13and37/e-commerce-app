import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import Button from '../../../components/ui/button/Button';
import Checkbox from '../../../components/ui/checkbox/Checkbox';

import classes from './Rigister.module.scss';
import { RegisterFormFields } from './interfaceRegister';

export default function RegisterForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<RegisterFormFields>({ mode: 'onBlur' });
  // const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
  //   console.log(data);
  // };

  const methods = useForm<RegisterFormFields>({ mode: 'onBlur' });
  const { handleSubmit } = methods;
  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className={`${classes.form}`} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={`${classes.form__title}`}>Sign up</h2>

        {/* <PersonalInfo register={register} errors={errors} /> */}

        <div className={`${classes.form__addresses}`}>
          <ShippingAddress /* register={register} errors={errors} */ />
          {/* <BillingAddress register={register} errors={errors} /> */}
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
