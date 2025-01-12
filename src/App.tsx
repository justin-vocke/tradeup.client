import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./styles/App.css";
import Subscriptions from "./components/Subscriptions";
import { Login, Register, AccessDenied } from "./pages";
import Header from "./layouts/Header";
function App() {
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
