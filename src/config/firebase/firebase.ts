// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET } from "src/constants/env-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
  // apiKey: "AIzaSyAafUtSLUQWD9_zaM7KWNrqIzYnBkTucbE",
  // authDomain: "capstone-project-ii-91d36.firebaseapp.com",
  // projectId: "capstone-project-ii-91d36",
  // storageBucket: "capstone-project-ii-91d36.appspot.com",
  // messagingSenderId: "247956632716",
  // appId: "1:247956632716:web:d22355000cc61de16377a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;