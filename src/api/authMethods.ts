import { MyCustomerDraft, Customer } from '@commercetools/platform-sdk';
import getApiRoot from './api';
import { projectKey } from './clientConfig';
import { RegisterFormFields } from './InterfaceApi';

export async function loginWithPassword(
  email: string,
  password: string
): Promise<void> {
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

    JSON.stringify(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login');
    }
  }
}

export async function loginByToken(): Promise<void> {
  try {
    const token = JSON.parse(localStorage.getItem('tokendata')!);
    // console.log(token);
    const apiRoot = getApiRoot(token.refreshToken);
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .get()
      .execute();

    JSON.stringify(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login');
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
  const newCustomerDetails: MyCustomerDraft = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    addresses: [
      {
        key: 'shipping',
        streetName: data.streetShipping,
        city: data.cityShipping,
        postalCode: data.postcodeShipping,
        country: data.countryShipping,
      },
      {
        key: 'billing',
        streetName: data.streetBilling,
        city: data.cityBilling,
        postalCode: data.postcodeBilling,
        country: data.countryBilling,
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 1,
  };

  JSON.stringify(newCustomerDetails, null, 2);

  try {
    const request = await getApiRoot()
      .withProjectKey({ projectKey })
      .customers()
      .post({ body: newCustomerDetails })
      .execute();
    const newCustomer: Customer = request.body.customer;
    JSON.stringify(newCustomer);

    return newCustomer;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
