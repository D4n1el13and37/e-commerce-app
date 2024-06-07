import { Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';

export async function getCustomer(): Promise<Customer> {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokendata')!).token;

    const apiRoot = getApiRoot('token', tokenData);
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
      throw new Error('Error from this function getCustomer');
    }
  }
}

interface UpdateCustomerData {
  version: number;
  actions: CustomerUpdateAction[];
  // currentPassword?: string;
  // newPassword?: string;
}

export async function updateCustomer(
  customerId: string,
  data: UpdateCustomerData
): Promise<Customer> {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokendata')!).token;

    const apiRoot = getApiRoot('token', tokenData);
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: customerId })
      .post({ body: data })
      .execute();

    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error from this function updateCustomer');
    }
  }
}

interface UpdateCustomerPasswordData {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export async function updateCustomerPassword(
  data: UpdateCustomerPasswordData
): Promise<Customer> {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokendata')!).token;

    const apiRoot = getApiRoot('token', tokenData);
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .password()
      .post({ body: data })
      .execute();

    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error from this function updateCustomer Password');
    }
  }
}
