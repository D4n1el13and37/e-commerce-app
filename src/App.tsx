// import { useState, useEffect } from 'react';
// import { projectKey, getApiRoot } from './api/BuildClient';
import Header from './components/header/Header';
import Button from './components/ui/button/Button';
import Checkbox from './components/ui/checkbox/Checkbox';
import Home from './pages/Home/Home';

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
    // <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    //   <Checkbox label="Are you sure?" isChecked={true} />
    //   <Checkbox isRequred={true} />
    //   <Checkbox isDisabled={true} />
    //   <Button type="submit" isMain={true} isFilled={true}>
    //     Filled
    //   </Button>
    //   <Button isMain={true} type="submit">
    //     Main
    //   </Button>
    //   <Button>+</Button>
    //   <Button isFilled={true} isDisabled={true}>
    //     -
    //   </Button>
    // </div>
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
