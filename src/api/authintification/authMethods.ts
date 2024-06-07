import { Customer } from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';
import { RegisterFormFields } from '../../pages/Register/Component/interfaceRegister';
import { MyCustom } from './authInterface';

export async function loginWithPassword(
  email: string,
  password: string
): Promise<Customer> {
  // change  to Customer from CustomerSignInResult
  try {
    const apiRoot = getApiRoot('password', { email, password });
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response.body.customer; // change to customer response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login');
    }
  }
}

export async function loginByToken(): Promise<Customer> {
  try {
    const token = JSON.parse(localStorage.getItem('tokendata') || '');
    const apiRoot = getApiRoot('token', token.token);
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .get()
      .execute();

    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function anon(): Promise<void> {
  try {
    const apiRoot = getApiRoot('anonymous');

    const response = await apiRoot
      .withProjectKey({ projectKey })
      .get()
      .execute();

    JSON.stringify(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknow error');
    }
  }
}

export async function RegistartionUser(
  data: RegisterFormFields
): Promise<Customer> {
  const newCustomerDetails: MyCustom = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateBirth,
    addresses: [
      {
        streetName: data.streetShipping,
        city: data.cityShipping,
        postalCode: data.postcodeShipping,
        country: data.countryShipping,
      },
      {
        streetName: data.streetBilling,
        city: data.cityBilling,
        postalCode: data.postcodeBilling,
        country: data.countryBilling,
      },
    ],

    defaultShippingAddress: data.defaultShippingAddress ? 0 : undefined,
    defaultBillingAddress: data.defaultBillingAddress ? 1 : undefined,

    shippingAddresses: [0],
    billingAddresses: [1],
  };

  try {
    const request = await getApiRoot()
      .withProjectKey({ projectKey })
      .customers()
      .post({ body: newCustomerDetails })
      .execute();
    const newCustomer: Customer = request.body.customer;

    // console.log(JSON.stringify(newCustomer));

    return newCustomer;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
