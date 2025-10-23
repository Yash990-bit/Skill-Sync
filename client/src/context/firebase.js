import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE6zCPeHht2GD4HICrKmNsEhKQpvEGkrk",
  authDomain: "skill-sync-15a8b.firebaseapp.com",
  projectId: "skill-sync-15a8b",
  storageBucket: "skill-sync-15a8b.firebasestorage.app",
  messagingSenderId: "28146611619",
  appId: "1:28146611619:web:5858aa56a7d0d9aec35616",
  measurementId: "G-MB6QYDC791"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, analytics, auth, googleProvider, githubProvider}