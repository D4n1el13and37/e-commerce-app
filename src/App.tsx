import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register/Register';
import LoginPage from './pages/Login/LoginPage';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
