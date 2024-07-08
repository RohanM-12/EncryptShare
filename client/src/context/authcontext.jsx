import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user"));
    if (temp) {
      setAuth({ user: temp.user, token: temp.token });
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token
      ? `Bearer ${auth?.token}`
      : null;
  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
