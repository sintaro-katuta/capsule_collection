import { initializeApp, getApps, getApp, app } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
};

// Initialize Firebase
export const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const storage = getStorage(firebase);
export const db = getFirestore(firebase);

export const initializeFirebaseApp = () =>
    !getApps().length ? initializeApp(firebaseConfig) : getApp()