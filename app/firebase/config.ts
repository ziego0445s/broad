import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVNFFXJ1NhWtYFhQ7vuFMsfUaRe6wvW58",
  authDomain: "boradtest-b7072.firebaseapp.com",
  databaseURL: "https://boradtest-b7072-default-rtdb.firebaseio.com",
  projectId: "boradtest-b7072",
  storageBucket: "boradtest-b7072.firebasestorage.app",
  messagingSenderId: "1082227357862",
  appId: "1:1082227357862:web:63a321b64a6a9df0fbdc67",
  measurementId: "G-RS8Z01RLY7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 