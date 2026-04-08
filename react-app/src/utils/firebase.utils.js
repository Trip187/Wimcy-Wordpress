import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

/* ----------------------------------
   Firebase config
---------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBIv7XSjz1SABGLwUfXryAxmHy2dgjzSg0",
  authDomain: "wimcy-2e94e.firebaseapp.com",
  projectId: "wimcy-2e94e",
  storageBucket: "wimcy-2e94e.firebasestorage.app",
  messagingSenderId: "1006393137909",
  appId: "1:1006393137909:web:4232c35bc274f2bd5183bc",
};

/* ----------------------------------
   Initialize Firebase (SAFE for WP)
---------------------------------- */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* ----------------------------------
   Services
---------------------------------- */
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ----------------------------------
   Google Auth
---------------------------------- */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/* ----------------------------------
   Comments
---------------------------------- */
export const addCommentToPost = async (postId, userDisplayName, comment) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("User not authenticated yet");
    throw new Error("Auth not ready");
  }

  const createdAt = Date.now();

  const commentData = {
    user: userDisplayName,
    comment,
    createdAt,
    userId: user.uid,
  };

  console.log("Writing comment:", commentData);
  console.log("auth.currentUser:", auth.currentUser);
  console.log("uid:", auth.currentUser?.uid);

  const docRef = await addDoc(
    collection(db, "comments", postId, "items"),
    commentData,
  );

  return {
    id: docRef.id,
    ...commentData,
  };
};

export const getCommentsForPost = async (postId) => {
  const q = query(
    collection(db, "comments", postId, "items"),
    orderBy("createdAt", "desc"),
  );
  const querySnapshot = await getDocs(q);
  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return comments;
};
