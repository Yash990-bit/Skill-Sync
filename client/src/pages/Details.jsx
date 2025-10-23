import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaStar, FaRocket, FaCogs, FaAward, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function CompanyDetails() {
  const [company, setCompany] = useState({
    name: "",
    logo: "",
    industry: "",
    rating: 4.5,
    reviews: [],
    location: "",
    founded: "",
    employees: "",
    website: "",
    email: "",
    phone: "",
    description: "",
    mission: "",
    vision: "",
    values: [],
    achievements: [],
    services: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch("/api/company/123"); 
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error("Error fetching company data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading company details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* 1. Header: Company Name & Logo */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-2xl p-6 mb-10 transition hover:shadow-xl">
          <div className="flex items-center gap-6">
            <img
              src={company.logo || "https://via.placeholder.com/120"}
              alt="Company Logo"
              className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{company.name}</h1>
              <p className="text-gray-500 mt-1">{company.industry}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                <FaStar className="mr-1" /> {company.rating} / 5.0
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow">Follow</button>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow"
            >
              Visit Website
            </a>
            <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition shadow">Contact</button>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
            <p><FaMapMarkerAlt className="inline mr-2 text-blue-500"/> <span className="font-semibold">Location:</span> {company.location || "N/A"}</p>
            <p><FaBuilding className="inline mr-2 text-green-500"/> <span className="font-semibold">Founded:</span> {company.founded || "N/A"}</p>
            <p><span className="font-semibold">Employees:</span> {company.employees || "N/A"}</p>
            <p><FaGlobe className="inline mr-2 text-green-600"/> <span className="font-semibold">Website:</span> <a href={company.website} className="text-blue-600 hover:underline">{company.website || "N/A"}</a></p>
            <p><FaEnvelope className="inline mr-2 text-gray-500"/> <span className="font-semibold">Email:</span> {company.email || "N/A"}</p>
            <p><FaPhone className="inline mr-2 text-gray-500"/> <span className="font-semibold">Phone:</span> {company.phone || "N/A"}</p>
          </div>
        </div>

        {/* 3. About / Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {company.description && (
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600">{company.description}</p>
            </div>
          )}
          {company.mission && (
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaRocket className="text-blue-500 text-2xl mb-2"/>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mission</h3>
              <p className="text-gray-600">{company.mission}</p>
            </div>
          )}
          {company.vision && (
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaCogs className="text-green-500 text-2xl mb-2"/>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Vision</h3>
              <p className="text-gray-600">{company.vision}</p>
            </div>
          )}
        </div>

        {company.achievements.length > 0 && (
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Key Achievements</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {company.achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </div>
        )}

        {company.services.length > 0 && (
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Services & Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.services.map((service, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
                  {service.icon && <img src={service.icon} alt={service.name} className="w-12 h-12 object-contain" />}
                  <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  {service.price && (
                    <p className="text-green-600 font-semibold mt-2">{service.price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
