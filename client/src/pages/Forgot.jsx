import React, { useState } from "react";
import { auth } from "../context/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom"; // <-- import Link

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 sm:p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">SkillSync</div>
        <div className="space-x-4">
          <Link
            to="/"
            className="px-4 py-2 font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot password</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            We'll send a verification link to your email if it matches an existing account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Next
            </button>
          </form>

          {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

          <button
            onClick={() => window.history.back()}
            className="mt-4 w-full text-gray-600 hover:text-gray-800 text-center"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
