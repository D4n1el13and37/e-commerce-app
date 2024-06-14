import { Cart, CartDraft, CartUpdate } from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';

export async function getActiveCart(): Promise<Cart> {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokendata')!).token;

    const apiRoot = getApiRoot('token', tokenData);
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .activeCart()
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

export async function createCart(cart: CartDraft): Promise<Cart> {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokendata')!).token;

    const apiRoot = getApiRoot('token', tokenData);
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .post({ body: cart })
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function updateCart(
  ID: string,
  cartUpdate: CartUpdate
): Promise<Cart> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID })
      .post({ body: cartUpdate })
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function deleteCart(ID: string, version: number): Promise<Cart> {
  try {
    const apiRoot = getApiRoot();
    const res = await apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID })
      .delete({ queryArgs: { version } })
      .execute();

    return res.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}
