// Initialize Firebase (your existing Firebase code)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFqT7P7_Ef-1AqjbQYbOBzt6xNvusT5WQ",
  authDomain: "dgjerseyy.firebaseapp.com",
  projectId: "dgjerseyy",
  storageBucket: "dgjerseyy.firebasestorage.app",
  messagingSenderId: "49173360743",
  appId: "1:49173360743:web:bbcf340278e7e09deae4c2",
  measurementId: "G-1Y88FRSGPH"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to add jerseys to Firestore
async function addJerseys() {
    // Loop to create 100 jerseys
    for (let i = 1; i <= 100; i++) {
        // Create a reference for each jersey document in Firestore
        const jerseyDocRef = doc(db, "jerseys", `jersey_${i}`);

        // Set jersey data with availability logic (e.g., 50 jerseys available, others out of stock)
        const availability = i <= 50;  // Jerseys 1-50 are available, the rest are out of stock

        // Add the jersey data to Firestore
        await setDoc(jerseyDocRef, {
            jerseyNumber: i,
            available: availability
        });

        console.log(`Jersey ${i} added!`);
    }
}

// Call the function to add jerseys to Firestore
addJerseys().catch((error) => {
    console.error("Error adding jerseys: ", error);
});
