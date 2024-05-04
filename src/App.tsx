import { useState, useEffect } from 'react';
import { projectKey, getApiRoot } from './api/BuildClient';
import './App.css';

function App() {
  const [projectDetails, setProjectDetails] = useState({});

  const getProducts = async () => {
    try {
      const project = await getApiRoot().withProjectKey({ projectKey }).products().get().execute();

      setProjectDetails(project.body);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div>Project Details</div>
      {JSON.stringify(projectDetails, undefined, 2)}
    </>
  );
}

export default App;
