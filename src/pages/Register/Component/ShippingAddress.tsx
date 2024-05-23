import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classes from './Rigister.module.scss';

export default function ShippingAddress() {
  const {
    control,
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOption> | null>(null);

  const defaultShippingAddress = watch('defaultShippingAddress', false);

  useEffect(() => {
    if (selectedCountry) {
      trigger('postcodeShipping');
    }
  }, [selectedCountry, trigger]);

  return (
    <div>
      <h3 className={classes.form__subtitle}>Shipping Address</h3>
      <div className={classes.address}>
        <div className={classes.address__information}>
          <div>
            <CountrySelect
              control={control}
              name="countryShipping"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            <div className={classes.error_container}>
              {errors.countryShipping && (
                <span className="error">
                  {errors.countryShipping.message as string}
                </span>
              )}
            </div>
          </div>
          <div className={classes.input_container}>
            <Input
              id="cityShipping"
              label="City"
              type="text"
              placeholder="City"
              error={
                errors.cityShipping
                  ? (errors.cityShipping.message as string)
                  : undefined
              }
              {...register('cityShipping', {
                required: 'City must have at least 1 character',
                validate: (value: string) => {
                  if (!/^[a-zA-Z]/.test(value)) {
                    return 'Should start with latin latters';
                  }
                  if (/\s{2,}/.test(value)) {
                    return `Only one " " is allowed between words`;
                  }
                  if (/--/.test(value)) {
                    return `Only one "-" is allowed between words`;
                  }
                  if (!/^[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/.test(value)) {
                    return `After a " " or "-" there should be a word`;
                  }
                  return true;
                },
              })}
            />

            <div className={classes.error_container}>
              {errors.cityShipping && (
                <span className="error">
                  {errors.cityShipping.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={classes.address__code}>
            <div className={classes.input_container}>
              <Input
                id={`streetShipping`}
                label="Street"
                type="text"
                placeholder="Street"
                error={
                  errors.streetShipping
                    ? (errors.streetShipping.message as string)
                    : undefined
                }
                {...register('streetShipping', {
                  required: 'Street must have at least 1 character',
                })}
              />

              <div className={classes.error_container}>
                {errors.streetShipping && (
                  <span className="error">
                    {errors.streetShipping.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className={classes.input_container}>
              <Input
                id="postcodeShipping"
                label="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                error={
                  errors.postcodeShipping
                    ? (errors.postcodeShipping.message as string)
                    : undefined
                }
                {...register('postcodeShipping', {
                  required: 'Postcode is required',
                  validate: (value) => {
                    if (selectedCountry && !selectedCountry.regex.test(value)) {
                      return `Invalid postcode format for ${selectedCountry.name}`;
                    }
                    return true;
                  },
                })}
              />

              <div className={classes.error_container}>
                {errors.postcodeShipping && (
                  <span className="error">
                    {errors.postcodeShipping.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Checkbox
          label="Use as default address"
          {...register('defaultShippingAddress')}
          checked={defaultShippingAddress}
        />
      </div>
    </div>
  );
}
