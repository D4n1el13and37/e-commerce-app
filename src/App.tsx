// import LoginPage from './pages/Login/LoginPage';
// import Home from './pages/Home/Home';
// import NotFound from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

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
    // <div
    // // style={{
    // //   display: 'flex',
    // //   flexWrap: 'wrap',
    // //   gap: '8px',
    // //   alignItems: 'center',
    // //   justifyContent: 'center',
    // //   height: '100dvh',
    // // }}
    // >
    //   {/* <Home />
    //   <LoginPage /> */}
    //   {/* <NotFound /> */}
    // </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
