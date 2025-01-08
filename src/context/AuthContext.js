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
import { get, ref, set, update } from "firebase/database";

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
      uuid: userUid,
      displayName: userName,
      email: user.email,
      photoURL: user.photoURL,
      address: "",
      group: "",
      createdAt: new Date().toISOString(),
      metadata: userCredential.user.metadata,
    });

    return userCredential;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await getIdToken(userCredential.user);

    // Set cookie for 7 days
    setCookie("access_token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });

    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      await update(userRef, {
        lastLogin: new Date().toISOString(),
      });
    }

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
