import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Login/LoginPage';

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
