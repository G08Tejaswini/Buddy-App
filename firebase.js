import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crucial for mobile: Import auth utilities from the React Native sub-package
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4lNIp7owMyRZop7Bk0ZScpmx34P1oJx8",
  authDomain: "streak-buddy-bbae7.firebaseapp.com",
  projectId: "streak-buddy-bbae7",
  storageBucket: "streak-buddy-bbae7.firebasestorage.app",
  messagingSenderId: "653423859774",
  appId: "1:653423859774:web:c3eef123536b17249a996f"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with explicit AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export authentication providers and database modules
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);