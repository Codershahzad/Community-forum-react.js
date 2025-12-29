// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuQsGEJcslJE-HJ22antBAg2SJJq90Mps",
  authDomain: "aykays-community-forum.firebaseapp.com",
  databaseURL: "https://aykays-community-forum-default-rtdb.firebaseio.com",
  projectId: "aykays-community-forum",
  storageBucket: "aykays-community-forum.appspot.com",
  messagingSenderId: "313174667848",
  appId: "1:313174667848:web:e91c10afed27e353c39e7d",
  measurementId: "G-XMYS039VDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
