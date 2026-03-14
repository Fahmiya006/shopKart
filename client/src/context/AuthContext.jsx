import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('userInfo');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Clean the token - remove any HTML or whitespace
      if (parsed.token) {
        parsed.token = parsed.token.replace(/<[^>]*>/g, '').trim();
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    // Clean token before saving
    if (userData.token) {
      userData.token = userData.token.replace(/<[^>]*>/g, '').trim();
    }
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};