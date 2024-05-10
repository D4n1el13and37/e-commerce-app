// import { useState, useEffect } from 'react';
// import { projectKey, getApiRoot } from './api/BuildClient';
import React from 'react';

// import './App.css';
import Register from './pages/Register/Register';
import Button from './components/ui/button/Button';
import Checkbox from './components/ui/checkbox/Checkbox';
import Input from './components/ui/input/Input';

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
    <div>
      <Register></Register>
      <Input
        id="password"
        width="350px"
        type="password"
        fieldName="Password"
        error="truw"
        onChange={(value) => value}
      />
      <Input
        id="name"
        fieldName="First Name"
        type="text"
        error=""
        placeholder="Enter your name"
        onChange={(value) => value}
      />
    </div>
  );
}

export default App;
