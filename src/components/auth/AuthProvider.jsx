import React, { createContext, useState, useContext } from "react";

// Utility function to parse JWT payload
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url).replace(/(.)/g, (m, p) =>
        p.charCodeAt(0) < 128
          ? "%" + ("0" + p.charCodeAt(0).toString(16)).slice(-2)
          : p
      )
    );
    return JSON.parse(base64);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedUser = parseJwt(storedToken);
      return decodedUser || null;
    }
    return null;
  });

  const handleLogin = (token) => {
    const decodedUser = parseJwt(token);
    if (decodedUser) {
      localStorage.setItem("userId", decodedUser.sub);
      localStorage.setItem("userRole", decodedUser.roles);
      localStorage.setItem("token", token);
      setUser(decodedUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
