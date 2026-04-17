import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRoXwa9iPkzX0QFneW01w8Khinf-NViz0",
  authDomain: "arun-kumar-portifolio.firebaseapp.com",
  projectId: "arun-kumar-portifolio",
  storageBucket: "arun-kumar-portifolio.firebasestorage.app",
  messagingSenderId: "387229059413",
  appId: "1:387229059413:web:47c98d660939f08bd647dc",
  measurementId: "G-5PJFMKNFZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set auth persistence
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
setPersistence(auth, browserLocalPersistence).catch(console.error);

export { auth, db, storage };
export default app;
