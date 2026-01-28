import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIv7XSjz1SABGLwUfXryAxmHy2dgjzSg0",
  authDomain: "wimcy-2e94e.firebaseapp.com",
  projectId: "wimcy-2e94e",
  storageBucket: "wimcy-2e94e.firebasestorage.app",
  messagingSenderId: "1006393137909",
  appId: "1:1006393137909:web:4232c35bc274f2bd5183bc",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// ✅ Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signOutUser = async () => signOut(auth);
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// ✅ Comments
export const addCommentToPost = async (postId, userDisplayName, comment) => {
  try {
    const docRef = doc(db, "comments", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const createdAt = new Date();

      const newComment = {
        user: userDisplayName,

        comment,

        createdAt: createdAt.getTime(),
      };

      const data = docSnap.get("comments");

      let newData = null;

      if (data) {
        newData = {
          comments: [...data, newComment],
        };
      } else {
        newData = {
          comments: [newComment],
        };
      }

      await updateDoc(docRef, newData);

      return newData;
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
