import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKey } from './BuildClient.ts';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  console.log(apiRoot);
  return apiRoot.products().get();
};


// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
