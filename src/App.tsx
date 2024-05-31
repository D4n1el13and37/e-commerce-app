import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useEffect } from 'react';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import { autorizationByToken } from './store/authSlice';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import NotFound from './pages/NotFound/NotFound';

import { CreateProduct } from './api/Products/createProducts';

import productList from './Products.json';
import productListVasya from './productsVasya.json';
import productListDanya from './productdanya.json';
import createCategories from './api/Products/createCategory';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  createCategories();

  productList.forEach((product) => {
    CreateProduct(product)
      .then((element) => {
        // eslint-disable-next-line no-console
        console.log('Product created successfully:', element);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error creating product:', error);
      });
  });

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'login',
          element: !isAuthorized ? <LoginPage /> : <Navigate to="/main" />,
        },
        {
          path: 'register',
          element: !isAuthorized ? <RegisterPage /> : <Navigate to="/main" />,
        },
        {
          path: 'main',
          element: isAuthorized ? <Home /> : <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
