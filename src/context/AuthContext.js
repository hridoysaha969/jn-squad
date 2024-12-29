"use client";
import { setCookie } from "cookies-next";
import { auth, db } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

const { createContext, useEffect, useContext, useState } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, userName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);
    setCookie("access_token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });

    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    const user = auth.currentUser;

    setCurrentUser({
      ...user,
    });
    const userUid = userCredential.user.uid;
    const userRef = ref(db, `users/${userUid}`);
    await set(userRef, {
      displayName: userName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
      uuid: userUid,
      metadata: userCredential.user.metadata,
    });
    console.log(userCredential.user);

    return userCredential;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    // Set cookie for 7 days
    setCookie("access_token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
    return userCredential;
  };

  const logOut = () => {
    // Remove cookie
    setCookie("access_token", "", { maxAge: -1, path: "/" });

    return signOut(auth);
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
