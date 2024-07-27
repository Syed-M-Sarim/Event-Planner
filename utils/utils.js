import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBibGR4VB_90eXcZOXwnGWc-1ZvI9DBaWM",
  authDomain: "first-project-15fc3.firebaseapp.com",
  projectId: "first-project-15fc3",
  storageBucket: "first-project-15fc3.appspot.com",
  messagingSenderId: "904073007465",
  appId: "1:904073007465:web:e5fad8a8ee227f7da46df8",
  measurementId: "G-NCQ9GPKRC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const analytics = getAnalytics(app);

export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithEmailAndPassword,
  signOut,
  getDoc,addDoc,collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
};