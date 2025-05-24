import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; 


const firebaseConfig = {
  apiKey: "AIzaSyAlgQIYWyEkn1xAnAri5tkRDU_JgFElSgE",
  authDomain: "minesafe-334ad.firebaseapp.com",
  projectId: "minesafe-334ad",
  storageBucket: "minesafe-334ad.firebasestorage.app",
  messagingSenderId: "930184991943",
  appId: "1:930184991943:web:752a83af5fb8bbed8cdae2",
  measurementId: "G-8JE3G1JL73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app); 

export { db };
