import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
      console.log('Storing user data:', userData); // Debug log
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
  };

  const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
  };

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
          {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
