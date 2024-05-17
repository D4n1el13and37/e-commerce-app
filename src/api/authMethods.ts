import { CustomerSignInResult } from '@commercetools/platform-sdk';
import getApiRoot from './api';
import { projectKey } from './clientConfig';

export async function loginWithPassword(
  email: string,
  password: string
): Promise<CustomerSignInResult> {
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
    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login');
    }
  }
}

// export async function loginByToken(): Promise<void> {
//   try {
//     const token = JSON.parse(localStorage.getItem('tokendata')!);
//     // console.log(token);
//     const apiRoot = getApiRoot(token.refreshToken);
//     const response = await apiRoot
//       .withProjectKey({ projectKey })
//       .me()
//       .get()
//       .execute();

//     // JSON.stringify(response);
//     console.log(response);
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error('Error during login');
//     }
//   }
// }

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
