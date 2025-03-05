import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NewDisccusion from './pages/NewDiscussion';
import SignUpPage from './pages/SignUpPage';
import UserDisscussion from './pages/UserDiscussion';
import UserPage from './pages/UserPage';

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
    path: '/userDiscussion/:id',
    element: <UserDisscussion />,
  },
  {
    path: '/userPage/:id',
    element: <UserPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
