import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {GoogleAuthProvider } from "firebase/auth";
import { getDocs, collection, query, where, addDoc, Timestamp, doc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVFM-V64cHvKtWwkQEgm1CIk0yTAzCgGk",
    authDomain: "breweryservice-c5e77.firebaseapp.com",
    databaseURL: "https://breweryservice-c5e77-default-rtdb.firebaseio.com",
    projectId: "breweryservice-c5e77",
    storageBucket: "breweryservice-c5e77.appspot.com",
    messagingSenderId: "892440808976",
    appId: "1:892440808976:web:2c2eaa569df5625bbb4495",
    measurementId: "G-CMMKDXJ2MZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { db, auth , provider, getDocs, collection, query, where, addDoc, onAuthStateChanged, Timestamp, doc };
