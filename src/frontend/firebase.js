import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // New import

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqB9wwOR067X0XVIxdBml42FCwUt-42x4",
  authDomain: "fever-scanner.firebaseapp.com",
  projectId: "fever-scanner",
  storageBucket: "fever-scanner.appspot.com",
  messagingSenderId: "527131199291",
  appId: "1:527131199291:web:c97d2b77600b37ce70d91e",
  measurementId: "G-0Q5G4WY4VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app); // New initialization

export { auth, db }; // Updated export
