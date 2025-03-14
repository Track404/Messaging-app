import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token).id : '';
  });

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setUserToken(jwtDecode(newToken).id);
    } else {
      localStorage.removeItem('token');
      setUserToken('');
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
