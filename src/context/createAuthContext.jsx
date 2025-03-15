import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserToken(decoded?.id || null);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setUserToken(null);
      }
    }
  }, []); // Runs on mount to load token

  const updateToken = (newToken) => {
    if (newToken) {
      try {
        localStorage.setItem('token', newToken);
        const decoded = jwtDecode(newToken);
        setUserToken(decoded?.id || null);
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
        setUserToken(null);
      }
    } else {
      localStorage.removeItem('token');
      setUserToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
