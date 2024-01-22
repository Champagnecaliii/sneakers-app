import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: email,
      name: user.displayName || '',
    });

    console.log('Registration successful');
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw new Error('Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    console.log('Login successful');
    return { token };
  } catch (error) {
    console.error('Login failed:', error.message);
    throw new Error('Login failed');
  }
};

export { register, login };

