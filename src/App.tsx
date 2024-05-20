import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useEffect } from 'react';
import Register from './pages/Register/Register';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import { autorizationByToken } from './store/authSlice';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import NotFound from './pages/NotFound/NotFound';
import NeedAutorizePage from './pages/NeedAutorizePage/NeedAutorizePage';

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
          element: !isAuthorized ? <Register /> : <Navigate to="/main" />,
        },
        {
          path: 'main',
          element: isAuthorized ? <Home /> : <NeedAutorizePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
