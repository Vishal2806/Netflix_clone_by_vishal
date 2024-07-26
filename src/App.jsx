import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// require('dotenv').config();


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        // Only navigate if not already on the home page
        if (location.pathname === "/login") {
          navigate("/");
        }
      } else {
        console.log("Logged Out");
        // Only navigate if not already on the login page
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div>
      {/* <Navbar /> */}
      <ToastContainer theme='dark' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
