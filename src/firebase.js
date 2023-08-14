import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmEiNkJmWDxXJJbqCOt7zxlrHgfpQ2Oto",
  authDomain: "joytopuz.firebaseapp.com",
  projectId: "joytopuz",
  storageBucket: "joytopuz.appspot.com",
  messagingSenderId: "457884664478",
  appId: "1:457884664478:web:ccd7322efd20327e0d318f",
  measurementId: "G-2V3CMLY9ME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
