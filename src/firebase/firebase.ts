import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase project configuration object
const firebaseConfig = {
  apiKey: "AIzaSyATAWoAOPghbfXqo3JHDlEJKQSFLXSP2l0",
  authDomain: "lesson1-auth-client.firebaseapp.com",
  projectId: "lesson1-auth-client",
  storageBucket: "lesson1-auth-client.appspot.com", // Ensure this matches your Firebase storage bucket
  messagingSenderId: "1081954115229",
  appId: "1:1081954115229:web:fac093fae8fbd7e5c77e74",
  measurementId: "G-19LY1C4N3N",
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

// Initialize Firestore database instance
const db = getFirestore(app);

// Initialize Firebase Authentication instance
const auth = getAuth(app);

// Export initialized instances for use in your app
export { app, db, auth };
