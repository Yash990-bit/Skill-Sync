import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import other pages as needed
import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add other routes here */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
