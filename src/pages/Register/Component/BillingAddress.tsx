import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useState } from 'react';

import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Input from '../../../components/ui/input/Input';
import { CountrySelect, CountryOption } from './AddressForm/CountrySelect';

import classes from './Rigister.module.scss';

export default function BillingAddress() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryOption> | null>(null);

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
            {errors.countryBilling?.message && (
              <div className={`${classes.error}`}>
                {errors.countryBilling?.message as string}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('streetBilling', {
                required: 'Billingt must have at least 1 character',
              })}
              id={`streetBilling`}
              // label="Street"
              type="text"
              placeholder="Street"
              onChange={(value) => value}
            />
            {errors.streetBilling && (
              <div className={`${classes.error}`}>
                {errors.streetBilling.message as string}
              </div>
            )}
          </div>

          <div className={`${classes.address__code}`}>
            <div>
              <Input
                {...register('cityBilling', {
                  required: 'City must have at least 1 character',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'City name must contain only letters',
                  },
                })}
                id="cityBilling"
                label="City"
                type="text"
                placeholder="City"
                onChange={(value) => value}
              />
              {errors.cityBilling && (
                <div className={`${classes.error}`}>
                  {errors.cityBilling.message as string}
                </div>
              )}
            </div>

            <div>
              <Input
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
                id="postcodeBilling"
                label="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                onChange={(value) => value}
              />
              {errors.postcodeBilling && (
                <div className={`${classes.error}`}>
                  {errors.postcodeBilling.message as string}
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
