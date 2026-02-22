// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqZsz9ka15YPnvDsghVA4Q0MLgNfEgbUo",
  authDomain: "t2-ecommerce-87840.firebaseapp.com",
  projectId: "t2-ecommerce-87840",
  storageBucket: "t2-ecommerce-87840.firebasestorage.app",
  messagingSenderId: "503205519830",
  appId: "1:503205519830:web:021e4a43c9be83c44bc477",
  measurementId: "G-Y5B0BDT1YT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
export default app;

