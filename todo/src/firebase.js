// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx6dehztQiEUGhquv_9nO8uTF6s8GF6oc",
  authDomain: "todo-9b4e3.firebaseapp.com",
  databaseURL: "https://todo-9b4e3-default-rtdb.firebaseio.com",
  projectId: "todo-9b4e3",
  storageBucket: "todo-9b4e3.appspot.com",
  messagingSenderId: "336858603516",
  appId: "1:336858603516:web:41981aeb352f7530ecdc79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)