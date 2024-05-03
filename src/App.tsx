import { useState, useEffect } from 'react';
import { projectKey, getApiRoot } from './api/BuildClient.ts';
import './App.css';

function App() {
  const [projectDetails, setProjectDetails] = useState({});

  const getProject = async () => {
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
    getProject();
  }, []);

  return (
    <>
      <div>Project Details</div>
      {JSON.stringify(projectDetails, undefined, 2)}
    </>
  );
}

export default App;
