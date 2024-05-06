import { SubmitHandler, useForm } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';

type RegisterFormFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirth: string;

  street: string;
  town: string;
  postcode: number;
  country: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>();
  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    console.log(data); // Accessing the personalInfo field
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>

      <PersonalInfo register={register} errors={errors} />

      <div>
        <ShippingAddress register={register} errors={errors} />
        <BillingAddress register={register} errors={errors} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
