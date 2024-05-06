export default function PersonalInfo({ register, errors }) {
  return (
    <div>
      <h3>Personal information</h3>
      <input {...register('email', { required: 'Email is required' })} type="text" placeholder="Email" />
      {errors.email && <div>{errors.email.message}</div>}
      <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password" />
      {errors.password && <div>{errors.password.message}</div>}
      <input {...register('firstName', { required: 'First Name is required' })} type="text" placeholder="First Name" />
      {errors.firstName && <div>{errors.firstName.message}</div>}
      <input {...register('lastName', { required: 'Last name is required' })} type="text" placeholder="Last Name" />
      {errors.lastName && <div>{errors.lastName.message}</div>}
      <input {...register('dateBirth', { required: 'Date of birth is required' })} type="date" />
      {errors.dateBirth && <div>{errors.dateBirth.message}</div>}
    </div>
  );
}
