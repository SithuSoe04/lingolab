// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBQQED2XzO-Pew1JFUA1rkJVH7lFnoWo8",
  authDomain: "lingolab-7a64d.firebaseapp.com",
  projectId: "lingolab-7a64d",
  storageBucket: "lingolab-7a64d.firebasestorage.app",
  messagingSenderId: "10866214502",
  appId: "1:10866214502:web:666ecebf0e332fa5fe4fa7",
  measurementId: "G-3RZCX4P1KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

// Example usage in another file:
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase';

// Add a document
// async function addData() {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       name: "John",
//       age: 30
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// // Get documents
// async function getData() {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }