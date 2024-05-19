import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Register from './pages/Register/Register';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import { autorizationByToken } from './store/authSlice';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import NotFound from './pages/NotFound/NotFound';
// import {  } from './store/store';
// import LoginPage from './pages/Login/LoginPage';

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  useEffect(() => {
    dispatch(autorizationByToken());
  }, [dispatch]);

  // добавить лоадинг перед вызовом
  // через маунт эффект вызвать чек авторизэйшн (ждем и показываем крутилку)
  // const [autorized, setAutorized] = useState(false);

  return (
    <Routes>
      <Route path="/" errorElement={<NotFound />} element={<Home />} />
      <Route
        path="/login"
        errorElement={<NotFound />}
        element={!isAuthorized ? <LoginPage /> : <Navigate to="/main" />}
      />
      <Route
        path="/register"
        errorElement={<NotFound />}
        element={!isAuthorized ? <Register /> : <Navigate to="/main" />}
      />
      {/* <Route path="/home" errorElement={<NotFound />} element={<Home />} /> */}
      <Route
        path="/main"
        errorElement={<NotFound />}
        element={isAuthorized ? <Home /> : <Navigate to="/login" />}
      />
      {/* <Route path="/*" element={<LoginPage />} /> */}
      {/* <Route
    //   path="/protected"
    //   element={
    //     <RequireAuth>
    //       {/* <ProtectedPage />
          </RequireAuth>
        }
      /> */}
    </Routes>
  );
}

export default App;
