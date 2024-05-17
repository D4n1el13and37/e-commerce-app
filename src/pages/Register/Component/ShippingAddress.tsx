import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classes from './Rigister.module.scss';

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
      <h3 className={`${classes.form__subtitle}`}>Shipping Address</h3>
      <div className={`${classes.address}`}>
        <div className={`${classes.address__information}`}>
          <div>
            <CountrySelect
              control={control}
              name="countryShipping"
              setSelectedCountry={setSelectedCountry}
              value={selectedCountry}
            />
            {errors.countryShipping?.message && (
              <div className={`${classes.error}`}>
                {errors.countryShipping?.message as string}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('streetShipping', {
                required: 'Street must have at least 1 character',
              })}
              id={`streetShipping`}
              label="Street"
              type="text"
              placeholder="Street"
              onChange={(value) => value}
            />
            {errors.streetShipping && (
              <div className={`${classes.error}`}>
                {errors.streetShipping.message as string}
              </div>
            )}
          </div>

          <div className={`${classes.address__code}`}>
            <div>
              <Input
                {...register('cityShipping', {
                  required: 'City must have at least 1 character',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Street name must contain only letters',
                  },
                })}
                id="cityShipping"
                label="City"
                type="text"
                placeholder="City"
                onChange={(value) => value}
              />
              {errors.cityShipping && (
                <div className={`${classes.error}`}>
                  {errors.cityShipping.message as string}
                </div>
              )}
            </div>

            <div>
              <Input
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
                id="postcodeShipping"
                label="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                onChange={(value) => value}
              />
              {errors.postcodeShipping && (
                <div className={`${classes.error}`}>
                  {errors.postcodeShipping.message as string}
                </div>
              )}
            </div>
          </div>
        </div>

        <Checkbox label="Use as default address" />
      </div>
    </div>
  );
}
