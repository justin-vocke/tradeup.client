import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./styles/App.css";
import Navbar from "./layouts/Navbar";
import Subscriptions from "./components/Subscriptions";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </>
  );
}

export default App;
