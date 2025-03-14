import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import SignUpPage from './pages/SignUpPage';
import NewDisccusion from './pages/NewDiscussion';
import UserPage from './pages/UserPage';
import UserDiscussion from './pages/UserDiscussion';
import NewGroup from './pages/NewGroup';
import LoadingNewDisccusion from './pages/LoadingPageNewDisccusion';

import SignUpPageFr from './pages-fr/SignUpPage-fr';
import NewDisccusionFr from './pages-fr/NewDiscussion-fr';
import UserPageFr from './pages-fr/UserPage-fr';
import UserDiscussionFr from './pages-fr/UserDiscussion-fr';
import NewGroupFr from './pages-fr/NewGroup-fr';
import LoadingNewDisccusionFr from './pages-fr/LoadingPageNewDisccusion-fr';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/createAuthContext';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import LoginPageFr from './pages-fr/LoginPage-fr';
import MainPageFr from './pages-fr/MainPage-fr';

const englishRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <SignUpPage /> },
  { path: '/interface', element: <MainPage /> },
  { path: '/newDiscussion', element: <NewDisccusion /> },
  { path: '/newGroup', element: <NewGroup /> },
  { path: '/userDiscussion/:chatType/:id', element: <UserDiscussion /> },
  { path: '/loading', element: <LoadingNewDisccusion /> },
  { path: '/userPage/:id', element: <UserPage /> },
]);

// French Router
const frenchRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/connexion" replace /> }, // Redirect to French login
  { path: '/connexion', element: <LoginPageFr /> }, // LoginPage is same, but could be localized
  { path: '/inscription', element: <SignUpPageFr /> }, // French version of register
  { path: '/interface', element: <MainPageFr /> },
  { path: '/nouvelleDiscussion', element: <NewDisccusionFr /> },
  { path: '/nouveauGroupe', element: <NewGroupFr /> },
  {
    path: '/discussionUtilisateur/:chatType/:id',
    element: <UserDiscussionFr />,
  },
  { path: '/chargement', element: <LoadingNewDisccusionFr /> },
  { path: '/pageUtilisateur/:id', element: <UserPageFr /> },
]);
function App() {
  const [language, setLanguage] = useState(
    navigator.language.startsWith('fr') ? 'fr' : 'en' // Set the default immediately
  );

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    setLanguage(userLang.startsWith('fr') ? 'fr' : 'en');
  }, []);

  return (
    <AuthProvider>
      <RouterProvider
        router={language === 'fr' ? frenchRouter : englishRouter}
      />
    </AuthProvider>
  );
}

export default App;
