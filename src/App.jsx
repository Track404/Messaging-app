import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NewDisccusion from './pages/NewDiscussion';
import SignUpPage from './pages/SignUpPage';
import UserDisscussion from './pages/UserDiscussion';
import UserPage from './pages/UserPage';
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
    element: <UserDisscussion />,
  },
  {
    path: '/newDiscussion',
    element: <NewDisccusion />,
  },
  {
    path: '/userDiscussion/:id',
    element: <UserDisscussion />,
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
