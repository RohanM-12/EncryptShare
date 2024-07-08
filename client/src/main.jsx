import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { AuthProvider } from "./context/authcontext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
