// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);