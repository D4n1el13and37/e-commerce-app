import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import Main from './pages/Main/Main';

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

  // <div
  //   style={{
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //     gap: '8px',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     height: '100dvh',
  //   }}
  // >
  //   <Home />
  //   <LoginPage />
  // </div>;

  return (
    <Routes>
      <Route path="/" errorElement={<NotFound />} element={<Home />} />
      <Route
        path="/login"
        errorElement={<NotFound />}
        element={<LoginPage />}
      />
      <Route path="/main" errorElement={<NotFound />} element={<Main />} />
      {/* <Route path="/*" element={<LoginPage />} /> */}
      {/* <Route
    //   path="/protected"
    //   element={
    //     <RequireAuth>
    //       {/* <ProtectedPage />
          </RequireAuth>
        }
      /> */}
    </Routes>
  );
}

export default App;
