import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Details from "../pages/Details";


export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<Details />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
