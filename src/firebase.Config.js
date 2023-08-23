// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuOwsKlsRdkY-OUB7cLpRAigFV7POfrgw",
  authDomain: "blogpost-31dca.firebaseapp.com",
  projectId: "blogpost-31dca",
  storageBucket: "blogpost-31dca.appspot.com",
  messagingSenderId: "318224533400",
  appId: "1:318224533400:web:96b1a20dfc3a18288b4ded",
  measurementId: "G-7X1ZW6ZDMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db=getFirestore(app);
export {app,auth,firestore,storage,analytics,db};