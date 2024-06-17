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
import BasketPage from './pages/Basket/BasketPage';
// import {
//   // deleteDiscounts,
//   getCart /* getCreateCart */,

// } from './store/cartSlice';
import {
  getAnonymCart,
  getCart /* getCreateCart */,
  getDiscounts,
  // getDiscounts,
  // getCreateCart,
} from './store/cartSlice';
// import { createCart2 } from './api/cart/cartMethods';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.currentUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // const [isInitialized, setIsInitialized] = useState(false);

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       console.log('Initializing authorization by token...');
  //       const resultAction = await dispatch(autorizationByToken()).unwrap();
  //       console.log('Authorization by token result:', resultAction);
  //       await dispatch(getCart()).unwrap();
  //     } catch (error) {
  //       console.error('Authorization by token failed:', error);
  //       await dispatch(getAnonymCart()).unwrap();
  //     } finally {
  //       setIsInitialized(true);
  //     }
  //   };

  //   initialize();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getDiscounts());
    const initialize = async () => {
      try {
        // console.log('Initializing authorization by token...');
        const token = localStorage.getItem('tokendata') || '';
        if (token) {
          await dispatch(autorizationByToken()).unwrap();
          // console.log('Authorization by token result:', resultAction);
        }
      } catch (error) {
        // console.error('Authorization by token failed:', error);
        // Если авторизация по токену не удалась, загружаем анонимную корзину
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
        // console.log('Fetching authorized user cart...');
        dispatch(getCart());
      } else {
        // console.log('Fetching anonymous cart...');
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
