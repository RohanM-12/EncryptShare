import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  // console.log("AuthContext", auth);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user"));
    if (temp) {
      setAuth({ user: temp.user, token: temp.token });
    }
  }, []);
  axios.defaults.headers.common["Authorization"] = auth?.token;
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
