import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";

const SAMPLE_PROJECTS = [
  { id: 1, title: "E-commerce UI - Shopify", tech: ["React", "Tailwind"], img: "https://placehold.co/600x360/bae6fd/075985?text=Project+1" },
  { id: 2, title: "SaaS Dashboard", tech: ["React", "D3"], img: "https://placehold.co/600x360/cffafe/0369a1?text=Project+2" },
  { id: 3, title: "Landing Page Conversion", tech: ["Next.js", "Framer"], img: "https://placehold.co/600x360/e0f2fe/0369a1?text=Project+3" },
];

export default function ProfilePage() {
 const [user, setUser] = useState({ name: "YourName", email: "", role: "" });

const getInitials = (name) => 
  name ? name.split(" ").map(n => n[0]).join("") : "AJ";

const [profileImage, setProfileImage] = useState(`https://placehold.co/240x240/60a5fa/ffffff?text=${getInitials(user.name)}`);


  const [aboutText, setAboutText] = useState("I build modern web applications using React and Node.js...");
  const [editing, setEditing] = useState(false);
  const [entries, setEntries] = useState([
    { label: "Experience", value: "6+ years" },
    { label: "Location", value: "Remote • IST" },
  ]);
  const [skills, setSkills] = useState(["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX", "Figma"]);
  const [newSkill, setNewSkill] = useState("");
  const ALL_SKILLS = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX", "Figma",
    "JavaScript", "Python", "Django", "Ruby on Rails", "GraphQL", "Vue.js", "Angular", "Svelte"
  ];
  const [suggestions, setSuggestions] = useState([]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);


  const addEntry = () => setEntries([...entries, { label: "", value: "" }]);
  const updateEntry = (idx, field, val) => {
    const newEntries = [...entries];
    newEntries[idx][field] = val;
    setEntries(newEntries);
  };
  const removeEntry = (idx) => setEntries(entries.filter((_, i) => i !== idx));

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setSuggestions([]);
    }
  };
  const handleRemoveSkill = (skill) => setSkills(skills.filter(s => s !== skill));
  const handleChangeSkillInput = (value) => {
    setNewSkill(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = ALL_SKILLS.filter(
      (skill) =>
        skill.toLowerCase().startsWith(value.toLowerCase()) &&
        !skills.includes(skill)
    );
    setSuggestions(matches);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setResult("Sending...");

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email); 
  formData.append("message", form.message);
  formData.append("access_key", "3c8bd682-8a6c-4d1c-82a2-50bb5ce8cccf");

  formData.append("subject", "We received your message!"); 
  formData.append("from_name", "Alex Johnson Portfolio");
  formData.append("reply_to", form.email);
  formData.append("redirect", "https://yourwebsite.com/thank-you"); 

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully! Check your email for confirmation.");
      setForm({ name: "", email: "", message: "" });
    } else {
      setResult("Error submitting form. Try again.");
    }
  } catch (error) {
    console.error(error);
    setResult("Network Error. Try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white text-gray-800">
      <Navbar name={user.name} />

      <section className="max-w-6xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-sky-800 leading-tight">
            Hi — I’m <span className="text-blue-600">{user.name}</span>.<br />
            I build performant & beautiful web apps.
          </h1>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-50">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-sky-200 shadow"
              src={profileImage}
              alt="profile"
            />
            <h3 className="mt-4 text-xl font-bold text-sky-800">{user.name}</h3>
             <p className="text-gray-600 text-sm">{user.role}</p>

            <div className="mt-4 flex gap-3">
              <label className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 text-sm">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setProfileImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <button
                onClick={() => setProfileImage("https://placehold.co/240x240/60a5fa/ffffff?text=AJ")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow p-8 border border-blue-50 relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-sky-800">About Me</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-sky-600 hover:text-sky-800 text-sm font-medium"
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>

          {editing ? (
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full border border-blue-100 rounded p-3 text-gray-700 mb-4"
              rows={3}
            />
          ) : (
            <p className="text-gray-600 mb-4">{aboutText}</p>
          )}

          <div>
            {entries.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                {editing ? (
                  <>
                    <input
                      value={entry.label}
                      onChange={(e) => updateEntry(idx, "label", e.target.value)}
                      placeholder="Label"
                      className="border border-blue-100 rounded px-2 py-1 text-sm w-1/3"
                    />
                    <input
                      value={entry.value}
                      onChange={(e) => updateEntry(idx, "value", e.target.value)}
                      placeholder="Details"
                      className="border border-blue-100 rounded px-2 py-1 text-sm w-2/3 mx-2"
                    />
                    <button
                      onClick={() => removeEntry(idx)}
                      className="text-red-600 text-sm font-medium hover:text-red-800"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">
                    <span className="font-semibold text-sky-700">{entry.label}: </span>
                    {entry.value}
                  </p>
                )}
              </div>
            ))}

            {editing && (
              <button
                onClick={addEntry}
                className="mt-2 bg-sky-500 text-white text-sm px-3 py-1 rounded hover:bg-sky-600"
              >
                + Add Entry
              </button>
            )}
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-sky-800">Skills</h3>
          <div className="flex items-center gap-2 relative w-64">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => handleChangeSkillInput(e.target.value)}
              placeholder="New skill"
              className="border px-2 py-1 rounded w-full"
              autoComplete="off"
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2"
              onClick={handleAddSkill}>
              Add</button>
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-blue-100 rounded mt-1 shadow z-10">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setSkills([...skills, s]);
                      setNewSkill("");
                      setSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((s, i) => (
            <div key={i} className="p-3 bg-white border border-blue-50 rounded-lg shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-sky-100 flex items-center justify-center text-sky-700 font-semibold">
                  {s[0]}
                </div>
                <div>
                  <div className="font-medium text-sky-800">{s}</div>
                  <div className="text-xs text-gray-500">Proficient</div>
                </div>
              </div>
              <button
                className="text-red-600 text-xs font-medium hover:text-red-800"
                onClick={() => handleRemoveSkill(s)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

     
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50">
          <h3 className="text-2xl font-bold text-sky-800">Get in touch</h3>
          <p className="text-gray-600 mt-2">Tell me about your project — I’ll respond within 24 hours.</p>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                type="text"
                name="name"
                placeholder="Your name"
                className="border border-blue-50 rounded px-4 py-3"
                required
              />
              <input
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                type="email"
                name="email"
                placeholder="Your email"
                className="border border-blue-50 rounded px-4 py-3"
                required
              />
            </div>

            <textarea
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              name="message"
              rows="5"
              placeholder="Message (brief - scope, timeline, budget)"
              className="border border-blue-50 rounded px-4 py-3"
              required
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-gradient-to-br from-sky-500 to-blue-500 text-white px-5 py-3 rounded-lg shadow"
              >
                Send message
              </button>
              {result && <div className="text-sm text-green-600">{result}</div>}
            </div>
          </form>
        </div>
      </section>

      <footer className="mt-12 border-t border-blue-50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} {user.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="text-sky-600 hover:text-sky-800" href="https://linkedin.com">LinkedIn</a>
            <a className="text-sky-600 hover:text-sky-800" href="https://github.com">GitHub</a>
            <a className="text-sky-600 hover:text-sky-800" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
