import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATEe-X2toCboM_xcmzZok2zGP7jlFDiYI",
  authDomain: "netflix-clone-61853.firebaseapp.com",
  projectId: "netflix-clone-61853",
  storageBucket: "netflix-clone-61853.appspot.com",
  messagingSenderId: "169020336591",
  appId: "1:169020336591:web:898efbdd18115904864aba",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// user sign up function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// user log in function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// user log out function
const logout = async () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
