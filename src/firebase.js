import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9QcrLLE5gkr_wK7iS55SeZKldkeWcM4g",
  authDomain: "joshjh2002-expressjs.firebaseapp.com",
  projectId: "joshjh2002-expressjs",
  storageBucket: "joshjh2002-expressjs.appspot.com",
  messagingSenderId: "703577989169",
  appId: "1:703577989169:web:3b3419bee94fcd48aeb510",
  measurementId: "G-ZY77SXNL5Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
