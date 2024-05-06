import { useState, useEffect } from 'react';
import { projectKey, getApiRoot } from './api/BuildClient';
import './App.css';
import Register from './pages/Register/Register';

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
      <Register></Register>
      {/* <div>Project Details</div>
      {JSON.stringify(projectDetails, undefined, 2)} */}
    </>
  );
}

export default App;
