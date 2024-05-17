import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classesRegister from './Rigister.module.scss';

export default function ShippingAddress() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOption> | null>(null);

  return (
    <div>
      <h3 className={`${classesRegister.form__subtitle}`}>Shipping Address</h3>
      <div className={`${classesRegister.address}`}>
        <div className={`${classesRegister.address__information}`}>
          <div>
            <CountrySelect
              control={control}
              name="countryShipping"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            {errors.countryShipping?.message && (
              <span className="error">
                {errors.countryShipping?.message as string}
              </span>
            )}
          </div>
          <div>
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
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'City name must contain only letters',
                },
              })}
            />
            {errors.cityShipping && (
              <span className="error">
                {errors.cityShipping.message as string}
              </span>
            )}
          </div>

          <div className={`${classesRegister.address__code}`}>
            <div>
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
              {errors.streetShipping && (
                <span className="error">
                  {errors.streetShipping.message as string}
                </span>
              )}
            </div>
            <div>
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
              {errors.postcodeShipping && (
                <span className="error">
                  {errors.postcodeShipping.message as string}
                </span>
              )}
            </div>
          </div>
        </div>

        <Checkbox label="Use as default address" />
      </div>
    </div>
  );
}
