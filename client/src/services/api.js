import { API_BASE_URL } from "./config";

// Signup a new user
export const signupUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
};

// Login a user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

// Get all projects
export const getProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/projects`);
  return await res.json();
};

// Create a new project (Client only)
export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return await res.json();
};
