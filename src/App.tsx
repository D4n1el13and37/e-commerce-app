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

// import productList from './Products.json';
// import productListVasya from './productsVasya.json';
import productListDanya from './productdanya.json';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  // добавить лоадинг перед вызовом
  // через маунт эффект вызвать чек авторизэйшн (ждем и показываем крутилку)
  // const [autorized, setAutorized] = useState(false);

  // const newProduct = {
  //   productTypeKey: 'plant-product-type',
  //   name: {
  //     'en-US': 'Fiddle Leaf Fig ',
  //     'ru-RU': 'Фикус Лират',
  //   },
  //   slug: {
  //     'en-US': 'fiddle-leaf-fig-3',
  //     'ru-RU': 'fikus-lirat-3',
  //   },
  //   description: {
  //     'en-US':
  //       'The fiddle leaf fig hails from the jungle, so a bright bathroom would be an ideal indoor location. A living room will also work if you protect the tree from drafts and give it enough bright filtered light and humidity. Outdoors will also do wonders for the fiddle leaf fig, so give it a temporary home as a patio plant during June.',
  //     'ru-RU':
  //       'Фиговое дерево родом из джунглей, поэтому идеальным местом для его размещения в помещении будет светлая ванная комната. Гостиная также подойдет, если вы защитите дерево от сквозняков и обеспечите ему достаточно яркий фильтрованный свет и влажность. Инжир на открытом воздухе также будет полезен, поэтому в июне устройте ему временный дом в качестве растения для патио.',
  //   },

  //   masterVariant: {
  //     sku: 'GPC-4',
  //     key: 'variant-key-GPC-4',
  //     prices: [
  //       {
  //         value: {
  //           currencyCode: 'EUR',
  //           centAmount: 3999,
  //         },
  //       },
  //     ],
  //     images: [
  //       {
  //         url: 'https://www.thespruce.com/thmb/j1IREt0UMI1lHkyzbOmLoIRvq_Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/grow-fiddle-leaf-fig-indoors-1902756-01-b92727e971c043cbb74c79c75a593bc3.jpg',
  //         dimensions: { w: 600, h: 600 },
  //         label: 'Fiddle Leaf Fig Image',
  //       },
  //       {
  //         url: 'https://www.thespruce.com/thmb/wxnKUBFYKRkBiY35tamGaMeqd_k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/grow-fiddle-leaf-fig-indoors-1902756-05-32d2eb47c63a427cabec0f5a52445013.jpg',
  //         dimensions: { w: 600, h: 600 },
  //         label: 'Fiddle Leaf Fig Image',
  //       },
  //     ],
  //     attributes: [
  //       { name: 'easyToCare', value: true },
  //       { name: 'airPurifying', value: true },
  //       { name: 'petFriendly', value: false },
  //       { name: 'indoorOutdoor', value: 'Indoor' },
  //       { name: 'color', value: 'Green' },
  //     ],
  //   },
  //   categories: [
  //     { key: 'indoor-trees' },
  //     { key: 'easy-to-care' },
  //     { key: 'air-purifying' },
  //   ],
  //   publish: true,
  // };

  productListDanya.forEach((product) => {
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
