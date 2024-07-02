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

// import { CreateProduct } from './api/Products/createProducts';

// import productList from './Products.json';
// import createCategories from './api/Products/createCategory';
// import createProductType, { newType } from './api/Products/CreateType';
// import { AttributeType, ProductTypeDraft } from '@commercetools/platform-sdk';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  // Что бы заново добавить продукты и категории. Сначала добавить тип.
  // Добаваление типа

  // createProductType(newType)
  //   .then(() => {
  //     // eslint-disable-next-line no-console
  //     console.log('Product type created successfully');
  //   })
  //   .catch((error) => {
  //     // eslint-disable-next-line no-console
  //     console.error('Error creating product type:', error);
  //   });

  // Создаем категории
  // createCategories();

  // Добавление продуктов
  // productList.forEach((product) => {
  //   CreateProduct(product)
  //     .then((element) => {
  //       // eslint-disable-next-line no-console
  //       console.log('Product created successfully:', element);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.error('Error creating product:', error);
  //     });
  // });

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
