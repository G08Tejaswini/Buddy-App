import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "firebase/auth";

GoogleSignin.configure({
  webClientId: "653423859774-abkp7dkrq5n58q1j6bj9m4n6t81b4f1v.apps.googleusercontent.com",
});

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    
    // Safely extract from the nested data object
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (!idToken) {
      throw new Error("No ID Token received from Google Sign-In");
    }

    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
  } catch (e) {
    console.log("Sign in error:", e.message);
  }
};

  const signOutUser = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
    } catch (e) {
      console.log("Sign out error:", e);
    }
  };

  return { user, loading, signIn, signOutUser };
}

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    
    // 1. Get the response object safely
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (!idToken) {
      throw new Error("No ID Token received. Check your Firebase client ID config.");
    }

    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
  } catch (e) {
    // 2. This alert will tell us EXACTLY what Android is mad about
    alert("Google Sign-In Error: " + e.message);
    console.log("Sign in error detailed:", e);
  }
};