import React from 'react';

import Checkbox from '../ui/checkbox/Checkbox';

export default function Address({ register, errors }) {
  return (
    <div>
      <div>
        <input
          {...register('street', {
            require: true,
            minLength: {
              value: 1,
              message: 'Street must have at least 1 characters',
            },
          })}
          type="text"
          placeholder="Street"
        />
        <div>
          <input
            {...register('town', {
              require: true,
              minLength: {
                value: 1,
                message: 'Street must have at least 1 characters',
              },
              validate: (value: string) => {
                const regexFirstName = /^[a-zA-Z]+$/;
                if (!regexFirstName.test(value)) {
                  return 'Street name must have just letters';
                }
              },
            })}
            type="text"
            placeholder="Town"
          />
          <input
            {...register('postcode', {
              require: true,
            })}
            type="text"
            placeholder="Postcode"
          />
        </div>
        <input {...register('country')} type="text" placeholder="Country" />
      </div>

      <Checkbox label="Use as default address" />
    </div>
  );
}
