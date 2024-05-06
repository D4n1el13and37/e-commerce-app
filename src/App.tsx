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
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button type="submit" isMain={true} isFilled={true}>
        Filled
      </Button>
      <Button type="submit" isMain={true} isDisabled={true} isFilled={true}>
        Filled Disabled
      </Button>
      <Button isMain={true} type="submit">
        Main
      </Button>
      <Button isMain={true} isDisabled={true} type="submit">
        Main Disabled
      </Button>
      <Button>+</Button>
      <Button isFilled={true}>+</Button>
      <Button isDisabled={true}>-</Button>
    </div>
  );
}

export default App;
