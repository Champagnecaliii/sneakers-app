import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv2Spp33W7oP0VF2vu11s-eP57TuwuYcE",
  authDomain: "collection-app-4ed32.firebaseapp.com",
  databaseURL:
    "https://collection-app-4ed32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collection-app-4ed32",
  storageBucket: "collection-app-4ed32.appspot.com",
  messagingSenderId: "1080355439411",
  appId: "1:1080355439411:web:af85a0f3d93840f7c33446",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const imgDB = getStorage(app);
const db = getFirestore(app);

export {
  auth,
  db,
  imgDB,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
