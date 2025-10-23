import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    bio: "",
    skills: [],
    portfolio: [],
    experience: [],
    education: [],
    social: { linkedin: "", github: "", website: "" },
    hourlyRate: "",
    availability: "Available",
    rating: 4.8,
    reviews: [],
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          const res = await fetch(`/api/user/${storedUser.id}`);
          const data = await res.json();
          setUser(data);
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setUser(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative w-32 h-32">
              <img
                src={formData.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs rounded-md p-1"
                />
              )}
            </div>

            <div className="flex-1">
              {editMode ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Email"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Bio"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      placeholder="Hourly Rate"
                      className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
                    />
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
                    >
                      <option>Available</option>
                      <option>Busy</option>
                      <option>Offline</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-500">{user.role}</p>
                  <p className="text-gray-600">{user.bio}</p>
                  <p className="text-gray-500">Email: {user.email}</p>
                  <p className="text-sm text-gray-400">
                    💸 {user.hourlyRate ? `$${user.hourlyRate}/hr` : "N/A"} | 🟢{" "}
                    {user.availability}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Skills</h2>
          {editMode ? (
            <input
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Add skills separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.skills.length > 0 ? (
                user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added.</p>
              )}
            </div>
          )}
        </div>
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Experience</h2>
          {user.experience.length > 0 ? (
            <ul className="space-y-3">
              {user.experience.map((exp, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="font-semibold">{exp.title}</p>
                  <p className="text-gray-500 text-sm">{exp.company}</p>
                  <p className="text-gray-400 text-xs">{exp.duration}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No experience added yet.</p>
          )}
        </div>
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Social Links</h2>
          <div className="space-y-2">
            <p>🔗 LinkedIn: {user.social.linkedin || "Not added"}</p>
            <p>💻 GitHub: {user.social.github || "Not added"}</p>
            <p>🌐 Website: {user.social.website || "Not added"}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            ⭐ Rating & Reviews
          </h2>
          <p className="text-lg font-semibold mb-3">
            {user.rating} / 5.0 ⭐
          </p>
          {user.reviews.length > 0 ? (
            <div className="space-y-3">
              {user.reviews.map((r, i) => (
                <div key={i} className="border-b pb-2">
                  <p className="text-gray-800 font-semibold">{r.client}</p>
                  <p className="text-gray-500 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
