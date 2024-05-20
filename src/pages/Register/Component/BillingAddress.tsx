import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classes from './Rigister.module.scss';

export default function BillingAddress() {
  const {
    control,
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOption> | null>(null);

  const defaultBillingAddress = watch('defaultBillingAddress', false);

  useEffect(() => {
    if (selectedCountry) {
      trigger('postcodeShipping');
    }
  }, [selectedCountry, trigger]);

  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Billing Address</h3>
      <div className={`${classes.address}`}>
        <div className={`${classes.address__information}`}>
          <div>
            <CountrySelect
              control={control}
              name="countryBilling"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            <div className={`${classes.error_container}`}>
              {errors.countryBilling && (
                <span className="error">
                  {errors.countryBilling.message as string}
                </span>
              )}
            </div>
          </div>
          <div className={`${classes.input_container}`}>
            <Input
              id="cityBilling"
              label="City"
              type="text"
              placeholder="City"
              error={
                errors.cityBilling
                  ? (errors.cityBilling.message as string)
                  : undefined
              }
              {...register('cityBilling', {
                required: 'City must have at least 1 character',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'City name must contain only letters',
                },
              })}
            />

            <div className={`${classes.error_container}`}>
              {errors.cityBilling && (
                <span className="error">
                  {errors.cityBilling.message as string}
                </span>
              )}
            </div>
          </div>

          <div className={`${classes.address__code}`}>
            <div className={`${classes.input_container}`}>
              <Input
                id={`streetBilling`}
                label="Street"
                type="text"
                placeholder="Street"
                error={
                  errors.streetBilling
                    ? (errors.streetBilling.message as string)
                    : undefined
                }
                {...register('streetBilling', {
                  required: 'Street must have at least 1 character',
                })}
              />

              <div className={`${classes.error_container}`}>
                {errors.streetBilling && (
                  <span className="error">
                    {errors.streetBilling.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className={`${classes.input_container}`}>
              <Input
                id="postcodeBilling"
                label="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                error={
                  errors.postcodeBilling
                    ? (errors.postcodeBilling.message as string)
                    : undefined
                }
                {...register('postcodeBilling', {
                  required: 'Postcode is required',
                  validate: (value) => {
                    if (selectedCountry && !selectedCountry.regex.test(value)) {
                      return `Invalid postcode format for ${selectedCountry.name}`;
                    }
                    return true;
                  },
                })}
              />

              <div className={`${classes.error_container}`}>
                {errors.postcodeBilling && (
                  <span className="error">
                    {errors.postcodeBilling.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Checkbox
          label="Use as default address"
          {...register('defaultBillingAddress')}
          checked={defaultBillingAddress}
        />
      </div>
    </div>
  );
}
