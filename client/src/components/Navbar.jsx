import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-teal-400 to-blue-600 shadow-md w-full text-white z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill Sync</h1>

        <div className="hidden lg:flex space-x-6">
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

        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gradient-to-r from-teal-400 to-blue-600 px-6 pb-4 space-y-3">
          <Link to="/home" className="block hover:text-gray-100 font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/" className="block hover:text-gray-100 font-medium" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/dashboard" className="block hover:text-gray-100 font-medium" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/details" className="block hover:text-gray-100 font-medium" onClick={() => setIsOpen(false)}>
            Details
          </Link>
          <Link to="/profile" className="block hover:text-gray-100 font-medium" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
