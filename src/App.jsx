import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import SignUpPage from './pages/SignUpPage';
import NewDisccusion from './pages/NewDiscussion';
import UserPage from './pages/UserPage';
import UserDiscussion from './pages/UserDiscussion';
import NewGroup from './pages/NewGroup';

import { AuthProvider } from './context/createAuthContext';

import LoadingNewDisccusion from './pages/LoadingPageNewDisccusion';
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
    element: <NewDisccusion />,
  },
  {
    path: '/newGroup',
    element: <NewGroup />,
  },
  {
    path: '/userDiscussion/:chatType/:id',
    element: <UserDiscussion />,
  },
  {
    path: '/loading',
    element: <LoadingNewDisccusion />,
  },
  {
    path: '/userPage/:id',
    element: <UserPage />,
  },
]);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
