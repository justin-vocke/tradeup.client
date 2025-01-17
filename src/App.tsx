import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./styles/App.css";
import Subscriptions from "./components/Subscriptions";
import { Login, Register, AccessDenied } from "./pages";
import Header from "./layouts/Header";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./Storage/Redux/userAuthSlice";
import { getUserInfo, isTokenExpired } from "./utils/tokens";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Current time in seconds
        if (!isTokenExpired(token)) {
          const userInfo = getUserInfo(token);
          dispatch(setLoggedInUser(userInfo)); // Pass the user info from the token
        } else {
          // Token is expired, clear it
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("accessToken"); // Remove invalid token
      }
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="accessdenied" element={<AccessDenied />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </>
  );
}

export default App;
