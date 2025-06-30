import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("dental_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
  const users = JSON.parse(localStorage.getItem('dental_users') || '[]');
  const foundUser = users.find(u =>
    u.email === email && u.password === password && u.role === role
  );
  if (foundUser) {
    setUser(foundUser);
    localStorage.setItem('dental_user', JSON.stringify(foundUser));
    return true;
  }
  return false;
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("dental_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
