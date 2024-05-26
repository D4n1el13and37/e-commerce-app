// // import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
// // import { ByProjectKeyProductProjectionsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/product-projections/by-project-key-product-projections-request-builder';
// // import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
// import getApiRoot from '../api';
// import { projectKey } from '../clientConfig';

// export default async function getProduct(ID: string): Promise<any> {
//   try {
//     const apiRoot = getApiRoot();
//     const res = await apiRoot
//       .withProjectKey({ projectKey })
//       .productProjections()
//       .withId({ ID })
//       .get()
//       .execute()

//     // console.log(JSON.stringify(res));
//     return res.body;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error('Error during login via');
//     }
//   }
// }
