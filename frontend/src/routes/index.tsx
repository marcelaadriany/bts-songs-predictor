import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Bet from "../pages/Bet";
import Results from "../pages/Results";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login key="login" initialMode="login" />}
        />
        <Route
          path="/register"
          element={<Login key="register" initialMode="register" />}
        />
        <Route path="/bet" element={<Bet />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}
