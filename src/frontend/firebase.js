import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // New import

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

// Function to register a new user
const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set default role to 'staff' and save user credentials
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: 'staff',
            uid: user.uid,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error registering user: ", error);
    }
};

export { auth, db, registerUser }; // Updated export
