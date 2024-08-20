import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React from "react";
const firebaseConfig = {
  apiKey: "AIzaSyCTYdjb06nA0jwBa_yegunF0kSYyA9AUVs",
  authDomain: "herdsync-9ec52.firebaseapp.com",
  projectId: "herdsync-9ec52",
  storageBucket: "herdsync-9ec52.appspot.com",
  messagingSenderId: "23659307441",
  appId: "1:23659307441:web:05749228e1f84ff3801d90",
  measurementId: "G-J52PQSZPJ0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
