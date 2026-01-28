import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  const db = getFirestore();
  const docs = doc(db, "comments", postId);
  const docsnap= await getDocs(docs);
  