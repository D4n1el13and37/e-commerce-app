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

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  // добавить лоадинг перед вызовом
  // через маунт эффект вызвать чек авторизэйшн (ждем и показываем крутилку)
  // const [autorized, setAutorized] = useState(false);

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
