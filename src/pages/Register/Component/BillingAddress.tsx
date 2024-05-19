import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classesRegister from './Rigister.module.scss';

export default function BillingAddress() {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOption> | null>(null);

  const defaultBillingAddress = watch('defaultBillingAddress', false);

  return (
    <div>
      <h3 className={`${classesRegister.form__subtitle}`}>Billing Address</h3>
      <div className={`${classesRegister.address}`}>
        <div className={`${classesRegister.address__information}`}>
          <div>
            <CountrySelect
              control={control}
              name="countryBilling"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            {errors.countryBilling?.message && (
              <span className="error">
                {errors.countryBilling?.message as string}
              </span>
            )}
          </div>

          <div>
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
            {errors.cityBilling && (
              <span className="error">
                {errors.cityBilling.message as string}
              </span>
            )}
          </div>

          <div className={`${classesRegister.address__code}`}>
            <div>
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
              {errors.streetBilling && (
                <span className="error">
                  {errors.streetBilling.message as string}
                </span>
              )}
            </div>
            <div>
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
                    if (
                      selectedCountry &&
                      !selectedCountry.regex.test(value) &&
                      value.length !== selectedCountry.lengthPostalcode
                    ) {
                      return 'Invalid postcode for this country';
                    }

                    return true;
                  },
                })}
              />
              {errors.postcodeBilling && (
                <span className="error">
                  {errors.postcodeBilling.message as string}
                </span>
              )}
            </div>
          </div>
        </div>

        <Checkbox
          label="Use as default billing address"
          {...register('defaultBillingAddress')}
          checked={defaultBillingAddress}
        />
      </div>
    </div>
  );
}
