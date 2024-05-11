import { useState } from 'react';
import Checkbox from '../../../components/ui/checkbox/Checkbox';
import { CountryOption, CountrySelect } from './AddressForm/CountrySelect';
import { FormInfoProps } from './interfaceRegister';
import classes from './Rigister.module.scss';
import Input from '../../../components/ui/input/Input';

export default function BillingAddress({ register, errors }: FormInfoProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  const handleCountryChange = (selectedOption: CountryOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Billing Address</h3>
      <div className={`${classes.address}`}>
        <div className={`${classes.address__information}`}>
          <div>
            <CountrySelect
              onCountryChange={handleCountryChange}
              {...register('countryBilling', {})}
            />
            {errors.countryBilling && (
              <div className={`${classes.error}`}>
                {errors.countryBilling.message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('streetBilling', {
                required: 'Street must have at least 1 character',
              })}
              id={`streetBilling`}
              fieldName="Street"
              type="text"
              placeholder="Street"
              onChange={(value) => value}
            />
            {errors.streetBilling && (
              <div className={`${classes.error}`}>
                {errors.streetBilling.message}
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
                    message: 'Street name must contain only letters',
                  },
                })}
                id="cityBilling"
                fieldName="City"
                type="text"
                placeholder="City"
                onChange={(value) => value}
              />
              {errors.cityBilling && (
                <div className={`${classes.error}`}>
                  {errors.cityBilling.message}
                </div>
              )}
            </div>

            <div>
              <Input
                {...register('postcodeBilling', {
                  required: 'Postcode is required',
                  // validate: (value) => {
                  //   if (
                  //     selectedCountry &&
                  //     !selectedCountry.regex.test(value) &&
                  //     value.length !== selectedCountry.lengthPostalcode
                  //   ) {
                  //     return 'Invalid postcode for this country';
                  //   }
                  //   return true;
                  // },
                })}
                id="postcodeBilling"
                fieldName="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                onChange={(value) => value}
              />
              {errors.postcodeBilling && (
                <div className={`${classes.error}`}>
                  {errors.postcodeBilling.message}
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
