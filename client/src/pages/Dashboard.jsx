// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Example stats
  const stats = {
    assigned: 5,
    completed: 3,
    pending: 2,
  };

  // Handle role change
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setUser((prev) => ({ ...prev, role: newRole }));

    // Save updated role in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, role: newRole })
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome, {user.name || "User"}!
          </h1>

          {/* Role Selection */}
          <div>
            <label className="text-gray-500 mr-2 font-medium">Role:</label>
            <select
              value={user.role || ""}
              onChange={handleRoleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Role</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Client">Client</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 text-blue-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-sm font-medium">Projects Assigned</p>
            <p className="text-3xl font-bold mt-2">{stats.assigned}</p>
          </div>
          <div className="bg-green-50 text-green-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-sm font-medium">Projects Completed</p>
            <p className="text-3xl font-bold mt-2">{stats.completed}</p>
          </div>
          <div className="bg-yellow-50 text-yellow-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-sm font-medium">Pending Proposals</p>
            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
