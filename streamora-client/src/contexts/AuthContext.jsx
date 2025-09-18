import React, { createContext, useContext, useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../lib/firebase";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  if (typeof window !== "undefined") {
    window.__auth = auth;
  }
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // authentication logic
  // email + password login (kept for flexibility during development)
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // google popup login — primary UX per plan
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // sign out the active user
  const signOutUser = () => firebaseSignOut(auth);

  // email + password sign-up (create account)
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    // onAuthStateChanged is the key Firebase listener.
    // triggers when the user signs in, signs out, or when the token is refreshed.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // store full firebase user object — contains uid, email, photoURL, etc.
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signOutUser,
    signUp,
    // expose a helper to fetch a fresh ID token for API calls
    getIdToken: async (forceRefresh = false) => {
      // if there's no user, return null so callers can handle auth flows
      if (!auth.currentUser) return null;
      return auth.currentUser.getIdToken(forceRefresh);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
