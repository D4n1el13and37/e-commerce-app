import Input from '../../../components/ui/input/Input';
import classes from './Rigister.module.scss';
import { FormInfoProps } from './interfaceRegister';

export default function PersonalInfo({ register, errors }: FormInfoProps) {
  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Personal information</h3>
      <div className={`${classes.form__personalData}`}>
        <div className={`${classes.credentials}`}>
          <div>
            <Input
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
              id="email"
              fieldName="Email"
              type="email"
              placeholder="Email"
              onChange={(value) => value}
            />
            {errors.email && (
              <div className={`${classes.error}`}>{errors.email.message}</div>
            )}
          </div>

          <div>
            <Input
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
              id="password"
              fieldName="Password"
              type="password"
              placeholder="Password"
              onChange={(value) => value}
            />
            {errors.password && (
              <div className={`${classes.error}`}>
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
        <div className={`${classes.profile}`}>
          <div className={`${classes.profile__person}`}>
            <div className={`${classes.profile__name}`}>
              <Input
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
                id="firstName"
                fieldName="First Name"
                type="text"
                placeholder="First Name"
                onChange={(value) => value}
              />
              {errors.firstName && (
                <div className={`${classes.error}`}>
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className={`${classes.profile__lastName}`}>
              <Input
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
                id="lastName"
                fieldName="Last Name"
                type="text"
                placeholder="Last Name"
                onChange={(value) => value}
              />
              {errors.lastName && (
                <div className={`${classes.error}`}>
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
          <div>
            <Input
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
                    (userAge === 13 && !isBirthdayPassed)
                  ) {
                    return 'You must be at least 13 years old';
                  }
                  return true;
                },
              })}
              id="dateBirth"
              fieldName="Date of birth"
              type="date"
              onChange={(value) => value}
            />
            {errors.dateBirth && (
              <div className={`${classes.error}`}>
                {errors.dateBirth.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
