import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/free.jpg";
import { auth, googleProvider, githubProvider } from "../context/firebase";
import {
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🛑 The Firebase functions are now available because of the uncommented imports
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert(`Email login successful! Welcome ${user.email}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === "Google") signInWithRedirect(auth, googleProvider);
    if (platform === "GitHub") signInWithRedirect(auth, githubProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          alert(
            `Login successful!\nName: ${user.displayName}\nEmail: ${user.email}`
          );
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
        if (error.code !== "auth/no-auth-event") {
          alert(error.message);
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <nav className="bg-gradient-to-r from-teal-400 to-blue-600 shadow-md w-full text-white">
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

      <div className="flex flex-1">
        <div
          className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 text-white shadow-xl relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="max-w-md relative z-10">
            <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-4 text-xl font-light">
              Login to your account to get started!
            </p>
            <div className="mt-10 flex items-center">
              <span className="text-xl font-medium">Skill Sync</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-center mb-10">
              Login using
            </h2>

            <div className="flex space-x-4 mb-8">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("GitHub")}
                className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium text-white bg-black hover:bg-gray-800 transition"
              >
                Login with GitHub
              </button>
            </div>

            <div className="text-center mb-6 text-gray-500 font-medium">OR</div>

            <h3 className="text-xl font-bold mb-4">Login with Email</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-end text-sm">
                <a
                  href="/forgot"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md font-semibold text-white bg-gradient-to-r from-teal-400 to-blue-600 hover:from-teal-500 hover:to-blue-700 transition shadow-lg"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}