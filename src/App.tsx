// import { useState, useEffect } from 'react';
// import { projectKey, getApiRoot } from './api/BuildClient';
import './App.css';
import Button from './components/ui/button/Button';

function App() {
  // const [projectDetails, setProjectDetails] = useState({});

  // const getProducts = async () => {
  //   try {
  //     const project = await getApiRoot()
  //       .withProjectKey({ projectKey })
  //       .products()
  //       .get()
  //       .execute();

  //     setProjectDetails(project.body);
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       throw new Error(e.message);
  //     } else {
  //       throw new Error('An unknown error occurred');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);
  // function handler() {
  //   console.log('click');
  // }

  return (
    <>
      <Button
        // onClick={handler}
        type="submit"
        isMain={true}
        isDisabled={true}
        isFilled={true}
        // title="VISTOR"
      >
        Victor
      </Button>
    </>
  );
}

export default App;
