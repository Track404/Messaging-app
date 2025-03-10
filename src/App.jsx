import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import SignUpPage from './pages/SignUpPage';
import NewDisccusionUpgrade from './pages/NewDiscussionUpgrade';
import UserPage from './pages/UserPage';
import UserDiscussion from './pages/UserDiscussion';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CurrentUserContext } from './context/createContext';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <SignUpPage />,
  },
  {
    path: '/Interface',
    element: <MainPage />,
  },
  {
    path: '/newDiscussion',
    element: <NewDisccusionUpgrade />,
  },
  {
    path: '/userDiscussion/:chatType/:id',
    element: <UserDiscussion />,
  },
  {
    path: '/userPage/:id',
    element: <UserPage />,
  },
]);
function App() {
  const [userToken, setUserToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserToken(decodedToken.id);
    }
  }, []);
  return (
    <>
      <CurrentUserContext value={userToken}>
        <RouterProvider router={router} />
      </CurrentUserContext>
    </>
  );
}

export default App;
