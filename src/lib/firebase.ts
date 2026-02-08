import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8_Ue8DT_7jVdrK2iefhRiP7m2vDS_4I8",
  authDomain: "expense-tracker-29634.firebaseapp.com",
  projectId: "expense-tracker-29634",
  storageBucket: "expense-tracker-29634.firebasestorage.app",
  messagingSenderId: "1091022710694",
  appId: "1:1091022710694:web:c62791a1e865d2f97a9167",
  measurementId: "G-03EZMSNGZS",
};

// Initialize Firebase - only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
