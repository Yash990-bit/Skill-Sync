import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", role: "" });
  const [stats, setStats] = useState({ assigned: 0, completed: 0, pending: 0 })
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) setUser(storedUser)
        const statsRes = await fetch("/api/dashboard/stats")
        const projectsRes = await fetch("/api/projects/active")
        const notifRes = await fetch("/api/notifications")

        setStats(await statsRes.json());
        setProjects(await projectsRes.json());
        setNotifications(await notifRes.json());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setUser((prev) => ({ ...prev, role: newRole }));
    localStorage.setItem("user", JSON.stringify({ ...user, role: newRole }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome, {user.name || "User"}!
          </h1>

          <div>
            <label className="text-gray-500 mr-2 font-medium">Role:</label>
            <select
              value={user.role}
              onChange={handleRoleChange}
              className="border border-gray-300 rounded-md px-3 py-2">
              <option value="">Select Role</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Client">Client</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 text-blue-800 p-6 rounded-xl shadow">
            <p>Projects Assigned</p>
            <p className="text-3xl font-bold">{stats.assigned}</p>
          </div>
          <div className="bg-green-50 text-green-800 p-6 rounded-xl shadow">
            <p>Projects Completed</p>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
          <div className="bg-yellow-50 text-yellow-800 p-6 rounded-xl shadow">
            <p>Pending Proposals</p>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Projects</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Project</th>
                  <th className="p-4 text-left">Client / Freelancer</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Deadline</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{p.name}</td>
                      <td className="p-4">{p.client || p.freelancer}</td>
                      <td className="p-4">{p.status}</td>
                      <td className="p-4">{p.deadline}</td>
                      <td className="p-4">
                        <button
                          className="text-blue-500 hover:underline mr-3"
                          onClick={() => navigate(`/projects/${p.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => navigate(`/projects/${p.id}/edit`)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-gray-500 text-center py-6">
                      No active projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-10">
          {user.role === "Client" && (
            <button
              onClick={() => navigate("/create-project")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              ➕ Create Project
            </button>
          )}
          {user.role === "Freelancer" && (
            <button
              onClick={() => navigate("/submit-proposal")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              📝 Submit Proposal
            </button>
          )}
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            👤 Update Profile
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Notifications</h2>
          <div className="bg-white rounded-xl shadow p-4">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className="p-3 mb-2 bg-gray-100 rounded-lg">
                  <p>{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No new notifications.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
