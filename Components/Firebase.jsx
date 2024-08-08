import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getStorage } from "firebase/storage";

/**
 * Configurazioni per firebase
 * */
const firebaseConfig = {
  apiKey: "AIzaSyA4U_dccfM_KVnUBD-576JjDaX8G2hG-KI",
  authDomain: "password-safe-66f8f.firebaseapp.com",
  projectId: "password-safe-66f8f",
  storageBucket: "password-safe-66f8f.appspot.com",
  messagingSenderId: "334381153577",
  appId: "1:334381153577:web:edad6e8b42d4c7509b4b38"
};

export const fb_app = initializeApp(firebaseConfig);
export const auth = getAuth(fb_app); //autenticazione
export const createUser = createUserWithEmailAndPassword; //funzione per creare l'account
export const signInUser = signInWithEmailAndPassword; //funzione per autenticare un utente
export const onAuthStateChange = onAuthStateChanged; //funzione che si occupa del cambiamento sull'autenticazione
export const signOutUser = signOut; //funzione per effettuare il logout da un acoount
export const storage = getStorage(fb_app);