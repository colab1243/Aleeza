import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe60CrJKuYjFTxfYSqynkzmd2sEKAHPnY",
    authDomain: "zuzu-1ea97.firebaseapp.com",
    projectId: "zuzu-1ea97",
    storageBucket: "zuzu-1ea97.firebasestorage.app",
    messagingSenderId: "905674133376",
    appId: "1:905674133376:web:a898deebc1fb3718a4fb65",
    measurementId: "G-KPF2MRRKB1"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

