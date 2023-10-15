import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcZOxseogzTuHq4yk-Td_-w_R2JyQqabk",
  authDomain: "photoalbum-5111c.firebaseapp.com",
  projectId: "photoalbum-5111c",
  storageBucket: "photoalbum-5111c.appspot.com",
  messagingSenderId: "1043380314975",
  appId: "1:1043380314975:web:ec1b235f069e04ac4e0cea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
