import Register from './pages/Register/Register';
// import LoginPage from './pages/Login/LoginPage';
// import Home from './pages/Home/Home';
// import NotFound from './pages/NotFound/NotFound';
// import LoginPage from './pages/Login/LoginPage';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import NotFound from './pages/NotFound/NotFound';
// import LoginPage from './pages/Login/LoginPage';

function App() {
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
      {/* <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
        }}
      >
        <LoginPage />
      </div> */}
      <Register />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<LoginPage />} />
      </Routes> */}
    </>
  );
}

export default App;
