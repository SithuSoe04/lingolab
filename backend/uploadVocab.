// uploadVocab.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

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
const db = getFirestore(app);

// Your vocabulary data
const vocabData = {
    "type": "data",
    "words": [
        {
            "word": "Text-to-SQL",
            "definition": "A technology that converts natural language questions into executable SQL commands.",
            "context": "Text-to-SQL, as a bridge between human language and machine-readable structured query languages, is crucial for many use cases, converting natural language questions into executable SQL commands."
        },
        {
            "word": "LLM",
            "definition": "Large Language Model, a type of artificial intelligence model that processes and generates human-like text.",
            "context": "In tackling the challenges of large language model (LLM) performance for Text-to-SQL tasks, we introduce CHASE-SQL, a new framework that employs innovative strategies."
        },
        {
            "word": "divide-and-conquer method",
            "definition": "A strategy that breaks down a complex problem into smaller, more manageable parts to solve it more efficiently.",
            "context": "a divide-and-conquer method that decomposes complex queries into manageable sub-queries in a single LLM call."
        },
        {
            "word": "chain-of-thought reasoning",
            "definition": "A reasoning process that involves a sequence of thoughts or steps, often used to solve complex problems.",
            "context": "chain-of-thought reasoning based on query execution plans, reflecting the steps a database engine takes during execution."
        }
    ]
};

// Function to upload data using word as ID
async function uploadVocabulary() {
    try {
        for (const wordData of vocabData.words) {
            // Create a URL-friendly ID from the word
            const docId = wordData.word.toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            // Create or update document with word as ID
            await setDoc(doc(db, "vocabulary", docId), {
                ...wordData,
                timestamp: new Date(),
                searchableWord: wordData.word.toLowerCase() // Add lowercase version for easier searching
            });
            
            console.log(`Uploaded: ${wordData.word}`);
        }
        console.log("Upload complete!");
    } catch (error) {
        console.error("Error uploading data:", error);
    }
}

// Run the upload
uploadVocabulary();