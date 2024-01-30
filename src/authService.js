import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const register = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: email,
      name: username,
    });
    console.log("Registration successful");
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw new Error("Registration failed");
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();
    const username = (
      await getDoc(doc(db, "users", userCredential.user.uid))
    ).data();
    console.log("Login successful");

    return { token, userUID: userCredential.user.uid, username };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw new Error("Login failed");
  }
};

const logOut = async () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out successfully!");
    })
    .catch((error) => {
      console.log("Something went wrong!");
    });
};

export { register, login, logOut };
