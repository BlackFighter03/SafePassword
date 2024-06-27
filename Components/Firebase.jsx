import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA4U_dccfM_KVnUBD-576JjDaX8G2hG-KI",
  authDomain: "password-safe-66f8f.firebaseapp.com",
  projectId: "password-safe-66f8f",
  storageBucket: "password-safe-66f8f.appspot.com",
  messagingSenderId: "334381153577",
  appId: "1:334381153577:web:edad6e8b42d4c7509b4b38"
};

const fb_app = initializeApp(firebaseConfig);

export { firebaseConfig, fb_app};