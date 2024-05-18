import { Customer } from '@commercetools/platform-sdk';
import getApiRoot from './api';
import { projectKey } from './clientConfig';

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
