import { useFormContext } from 'react-hook-form';

import Input from '../../../components/ui/input/Input';
import EmailInput from '../../../components/form/email/EmailInput';
import PasswordInput from '../../../components/form/password/PasswordInput';

import classes from './Rigister.module.scss';

export default function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Personal information</h3>
      <div className={`${classes.form__personalData}`}>
        <div className={`${classes.credentials}`}>
          <div className={`${classes.input_container}`}>
            <EmailInput />
            <div className={`${classes.error_container}`}>
              {errors.email && (
                <span className="error">{errors.email.message as string}</span>
              )}
            </div>
          </div>
          <div>
            <PasswordInput />
            {errors.password && (
              <span className="error">{errors.password.message as string}</span>
            )}
          </div>
        </div>
        <div className={`${classes.profile}`}>
          <div className={`${classes.profile__person}`}>
            <div className={`${classes.profile__name}`}>
              <Input
                id="firstName"
                autoComplete="firstName"
                label="First Name"
                type="text"
                placeholder="First Name"
                error={
                  errors.firstName
                    ? (errors.firstName.message as string)
                    : undefined
                }
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 1,
                    message: 'First name must have at least 1 character',
                  },
                  validate: (value: string) => {
                    const regexFirstName = /^[a-zA-Z]+$/;
                    if (!regexFirstName.test(value)) {
                      return 'First name must contain only latin letters';
                    }
                    return true;
                  },
                })}
              />
              {errors.firstName && (
                <div className="error">
                  {errors.firstName.message as string}
                </div>
              )}
            </div>
            <div className={`${classes.profile__lastName}`}>
              <Input
                id="lastName"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                error={
                  errors.lastName
                    ? (errors.lastName.message as string)
                    : undefined
                }
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 1,
                    message: 'Last name must have at least 1 character',
                  },
                  validate: (value: string) => {
                    const regexLastName = /^[a-zA-Z]+$/;
                    if (!regexLastName.test(value)) {
                      return 'Last name must contain only latin letters';
                    }
                    return true;
                  },
                })}
              />
              {errors.lastName && (
                <span className="error">
                  {errors.lastName.message as string}
                </span>
              )}
            </div>
          </div>
          <div>
            <Input
              id="dateBirth"
              label="Date of Birth"
              type="date"
              error={
                errors.dateBirth
                  ? (errors.dateBirth.message as string)
                  : undefined
              }
              {...register('dateBirth', {
                required: 'Date of birth is required',
                validate: (value: string) => {
                  const minimumAge = 13;
                  const dateToday = new Date();
                  const dateBirth = new Date(value);
                  const userAge =
                    dateToday.getFullYear() - dateBirth.getFullYear();
                  const isBirthdayPassed =
                    dateToday.getMonth() > dateBirth.getMonth() ||
                    (dateToday.getMonth() === dateBirth.getMonth() &&
                      dateToday.getDate() >= dateBirth.getDate());

                  if (
                    userAge < minimumAge ||
                    (userAge === minimumAge && !isBirthdayPassed)
                  ) {
                    return 'You must be at least 13 years old';
                  }
                  return true;
                },
              })}
            />
            {errors.dateBirth && (
              <span className="error">
                {errors.dateBirth.message as string}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
