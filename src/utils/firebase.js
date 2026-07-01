// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO23BgtfSNclVT0RuFCHvbZxjGiYJX2pg",
  authDomain: "netflix-gpt-d54e9.firebaseapp.com",
  projectId: "netflix-gpt-d54e9",
  storageBucket: "netflix-gpt-d54e9.firebasestorage.app",
  messagingSenderId: "312186107245",
  appId: "1:312186107245:web:4abe6bc939c6ba22725664",
  measurementId: "G-FGFSSXFNVX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
