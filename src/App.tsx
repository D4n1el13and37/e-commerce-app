import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import { autorizationByToken } from './store/authSlice';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import CatalogPage from './pages/Catalog/CatalogPage';
import NotFound from './pages/NotFound/NotFound';
import ProductPage from './pages/Product/ProductPage';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          errorElement: <NotFound />,
          children: [
            {
              path: '',
              element: <Home />,
            },
            {
              path: 'catalog',
              element: <CatalogPage />,
            },
            {
              path: 'login',
              element: !isAuthorized ? <LoginPage /> : <Navigate to="/main" />,
            },
            {
              path: 'register',
              element: !isAuthorized ? (
                <RegisterPage />
              ) : (
                <Navigate to="/main" />
              ),
            },
            {
              path: 'main',
              element: isAuthorized ? <Home /> : <Navigate to="/" />,
            },
            {
              path: 'product',
              element: <ProductPage />,
            },
          ],
        },
      ]),
    [isAuthorized]
  );
  if (isLoading) {
    return <div>Loadiiing...</div>;
  }
  return <RouterProvider router={router} />;
}

export default App;
