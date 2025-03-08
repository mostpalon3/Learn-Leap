import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref, get, child, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

export const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [name, setName] = useState("");
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // const signinUserWithEmailAndPassword = (email, password) => {
  //   signInWithEmailAndPassword(firebaseAuth, email, password);
  // };

  const putData = (key, data) => {
    set(ref(database, key), data);
  };

  const getData = async (key) => {
    const snapshot = await get(child(ref(database), key));
    return snapshot.val();
  };

  // logs data as soon as it is changed
  // onValue(ref(database, "root"), (snapshot) => {
  //   console.log(snapshot.val());
  // });

  onValue(ref(database, "root"), (snapshot) => {
    console.log(snapshot.val());
  });

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        // signinUserWithEmailAndPassword,
        putData,
        getData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
