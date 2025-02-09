import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase';

// Add a document
async function addData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John",
      age: 30
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Get documents
async function getData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}