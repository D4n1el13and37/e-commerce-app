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
import UserProfile from './pages/UserProfile/UserProfile';
import ProductPage from './pages/Product/ProductPage';
import ProductList from './pages/Catalog/components/product_list/ProductList';
import { getCart /* getCreateCart */ } from './store/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  //* get our cart
  // const isCart = useAppSelector((state) => state.cart.cart);

  // const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(autorizationByToken());

    const cartCheck = async () => {
      try {
        //* for get active cart
        await dispatch(getCart());
        // console.log('try', res);

        //* for create cart or reset the cart
        // await dispatch(getCreateCart());
        // console.log('create', res);
      } catch {
        // const res = await dispatch(getCreateCart());
      }
    };

    cartCheck();

    // console.log(isCart);
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
              children: [
                {
                  path: '',
                  element: <ProductList />,
                },
                {
                  path: ':categoryName',
                  element: <ProductList />,
                },

                {
                  path: ':categoryName/:subcategoryName',
                  element: <ProductList />,
                },
              ],
            },
            {
              path: 'catalog/product/:productId',
              element: <ProductPage />,
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
              path: 'account',
              element: isAuthorized ? <UserProfile /> : <Navigate to="/" />,
            },
          ],
        },
      ]),
    [isAuthorized]
  );

  // I commented out that piece of code because if it's there. Then server errors during registration and authorisation are not shown

  // if (isLoading) {
  //   return <div>Loadiiing...</div>;
  // }
  return <RouterProvider router={router} />;
}

export default App;
