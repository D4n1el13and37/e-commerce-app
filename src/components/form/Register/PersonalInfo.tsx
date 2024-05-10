import classes from './Rigister.module.scss';
import { FormInfoProps } from './interfaceRegister';

export default function PersonalInfo({ register, errors }: FormInfoProps) {
  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Personal information</h3>
      <div className="">
        <input
          {...register('email', {
            required: 'Email is required',
            validate: (value: string) => {
              const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
              if (!regexEmail.test(value)) {
                return 'Please enter a valid email address in the format "name@domain.com".';
              }
              return true;
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && <div>{errors.email.message}</div>}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
            validate: (value: string) => {
              const regexPasssword =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
              if (!regexPasssword.test(value)) {
                return 'Password must include at least one uppercase letter, one lowercase letter, and one number';
              }
              return true;
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <div>{errors.password.message}</div>}
      </div>
      <div className="">
        <div className="">
          <input
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 1,
                message: 'First name must have at least 1 characters',
              },
              validate: (value: string) => {
                const regexFirstName = /^[a-zA-Z]+$/;
                if (!regexFirstName.test(value)) {
                  return 'First name must have just letters';
                }
                return true;
              },
            })}
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && <div>{errors.firstName.message}</div>}

          <input
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 1,
                message: 'Last name must have at least 1 characters',
              },
              validate: (value: string) => {
                const regexLastName = /^[a-zA-Z]+$/;
                if (!regexLastName.test(value)) {
                  return 'Last name must have just letters';
                }
                return true;
              },
            })}
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && <div>{errors.lastName.message}</div>}
        </div>
        <input
          {...register('dateBirth', {
            required: 'Date of birth is required',
            validate: (value: string) => {
              const minimumAge = 13;

              const dateToday = new Date();
              const dateBirth = new Date(value);
              const userAge = dateToday.getFullYear() - dateBirth.getFullYear();
              const isBirthdayPassed =
                dateToday.getMonth() > dateBirth.getMonth() ||
                (dateToday.getMonth() === dateBirth.getMonth() &&
                  dateToday.getDate() >= dateBirth.getDate());

              if (
                userAge < minimumAge ||
                (userAge === 13 && !isBirthdayPassed)
              ) {
                return 'You must be at least 13 years old';
              }
              return true;
            },
          })}
          type="date"
        />
        {errors.dateBirth && <div>{errors.dateBirth.message}</div>}
      </div>
    </div>
  );
}
