import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '../../../components/ui/checkbox/Checkbox';
import { CountryOption, CountrySelect } from './AddressForm/CountrySelect';
import { FormInfoProps } from './interfaceRegister';
import classes from './Rigister.module.scss';
import Input from '../../../components/ui/input/Input';

export default function ShippingAddress({
  register,
  errors,
  control,
}: FormInfoProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  const handleCountryChange = (selectedOption: CountryOption) => {
    setSelectedCountry(selectedOption);
    console.log('selectedOption', selectedOption);
  };

  return (
    <div>
      <h3 className={`${classes.form__subtitle}`}>Shipping Address</h3>
      <div className={`${classes.address}`}>
        <div className={`${classes.address__information}`}>
          <div>
            <CountrySelect
              onCountryChange={handleCountryChange}
              {...register('countryShipping', {})}
            />
            {errors.countryShipping && (
              <div className={`${classes.error}`}>
                {errors.countryShipping.message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('streetShipping', {
                required: 'Street must have at least 1 character',
              })}
              id={`streetShipping`}
              fieldName="Street"
              type="text"
              placeholder="Street"
              onChange={(value) => value}
            />
            {errors.streetShipping && (
              <div className={`${classes.error}`}>
                {errors.streetShipping.message}
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
                fieldName="City"
                type="text"
                placeholder="City"
                onChange={(value) => value}
              />
              {errors.cityShipping && (
                <div className={`${classes.error}`}>
                  {errors.cityShipping.message}
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
                fieldName="Postcode"
                type="text"
                placeholder="Postcode"
                disabled={!selectedCountry}
                onChange={(value) => value}
              />
              {errors.postcodeShipping && (
                <div className={`${classes.error}`}>
                  {errors.postcodeShipping.message}
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
