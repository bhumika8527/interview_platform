// Import the functions you need from the SDKs you need
import {getApp, getApps,initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCugSMCmVMyC1fyPoGODO4yKylxVmcKa5o",
  authDomain: "mockify-368a7.firebaseapp.com",
  projectId: "mockify-368a7",
  storageBucket: "mockify-368a7.firebasestorage.app",
  messagingSenderId: "80808904373",
  appId: "1:80808904373:web:8d4707492d8067cf6220fc",
  measurementId: "G-Y5GKJB6F4B"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();


export const auth= getAuth(app);
export const db= getFirestore(app);