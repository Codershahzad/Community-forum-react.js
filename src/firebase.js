import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuQsGEJcslJE-HJ22antBAg2SJJq90Mps",
  authDomain: "aykays-community-forum.firebaseapp.com",
  databaseURL: "https://aykays-community-forum-default-rtdb.firebaseio.com",
  projectId: "aykays-community-forum",
  storageBucket: "aykays-community-forum.appspot.com",
  messagingSenderId: "313174667848",
  appId: "1:313174667848:web:e91c10afed27e353c39e7d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
