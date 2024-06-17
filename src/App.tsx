import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
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
import AboutUs from './pages/AboutUs/AboutUs';
import BasketPage from './pages/Basket/BasketPage';
import { getAnonymCart, getCart, getDiscounts } from './store/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.currentUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(getDiscounts());

    const initialize = async () => {
      try {
        const token = localStorage.getItem('tokendata') || '';
        if (token) {
          await dispatch(autorizationByToken()).unwrap();
        }
      } catch (error) {
        await dispatch(getAnonymCart()).unwrap();
      } finally {
        setIsAuthChecked(true);
      }
    };

    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked) {
      if (isAuthorized) {
        dispatch(getCart());
      } else {
        dispatch(getAnonymCart());
      }
    }
  }, [dispatch, isAuthChecked, isAuthorized]);

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
              path: 'basket',
              element: <BasketPage />,
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
            {
              path: 'about',
              element: <AboutUs />,
            },
          ],
        },
      ]),
    [isAuthorized]
  );

  return <RouterProvider router={router} />;
}

export default App;
