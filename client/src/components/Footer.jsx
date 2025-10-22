import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">

          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold ">Skill Sync</h2>
            <p className="text-gray-300 max-w-xs">
              Unlock the world of talent. Find professionals, grow your business, and explore opportunities anywhere, anytime.
            </p>
            <div className="flex space-x-4 mt-2 ">
              <a href="#" className="text-gray-700 hover:text-sky-300">
                <FaGithub/>
              </a>
              <a href="#" className="text-gray-700 hover:text-sky-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-700 hover:text-sky-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <Link to="/home" className="hover:text-blue-300">Home</Link>
            <Link to="/" className="hover:text-blue-300">Login</Link>
            <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
            <Link to="/profile" className="hover:text-blue-300">Profile</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <Link to="/guides" className="hover:text-blue-300">Guides</Link>
            <Link to="/blog" className="hover:text-blue-300">Blog</Link>
            <Link to="/faq" className="hover:text-blue-300">FAQ</Link>
            <Link to="/login" className="hover:text-blue-300">Contact</Link>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
            <p className="text-gray-300">Get updates and latest guides directly in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-2 text-gray-300">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 flex-1"/>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-300 text-white rounded-md hover:text-black transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Skill Sync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
