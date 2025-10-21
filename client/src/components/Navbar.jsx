import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-400 to-blue-600 shadow-md w-full text-white z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill Sync</h1>
        <div className="space-x-6">
          <Link to="/home" className="hover:text-gray-100 font-medium">
            Home
          </Link>
          <Link to="/" className="hover:text-gray-100 font-medium">
            Login
          </Link>
          <Link to="/dashboard" className="hover:text-gray-100 font-medium">
            Dashboard
          </Link>
          <Link to="/details" className="hover:text-gray-100 font-medium">
            Details
          </Link>
          <Link to="/profile" className="hover:text-gray-100 font-medium">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
