import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Homepage from "./pages/homepage";
import Header from "./pages/header";
import ProtectedRoute from "./components/ProtectedRoutes";
import Socials from "./components/Socials";
function App() {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
        <Socials bgColor={"bg-stone-200"} />
      </Router>
    </>
  );
}

export default App;
