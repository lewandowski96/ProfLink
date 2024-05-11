// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCo6lsfy7wV66Jg0cA_oiqoj6okSd9QAY",
  authDomain: "proflink-2ebf7.firebaseapp.com",
  projectId: "proflink-2ebf7",
  storageBucket: "proflink-2ebf7.appspot.com",
  messagingSenderId: "399720079234",
  appId: "1:399720079234:web:1ab378bdbec98e1357399b",
  measurementId: "G-E28J0MCNT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
