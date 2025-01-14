import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFqT7P7_Ef-1AqjbQYbOBzt6xNvusT5WQ",
  authDomain: "dgjerseyy.firebaseapp.com",
  projectId: "dgjerseyy",
  storageBucket: "dgjerseyy.firebasestorage.app",
  messagingSenderId: "49173360743",
  appId: "1:49173360743:web:bbcf340278e7e09deae4c2",
  measurementId: "G-1Y88FRSGPH",
  databaseURL: "https://dgjerseyy-default-rtdb.firebaseio.com/" // Ensure this URL is correct
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch data from Realtime Database
function populateJerseyNumbers() {
  const jerseyRef = ref(db, 'jerseys/'); // Reference to the 'jerseys' collection
  get(jerseyRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const jerseys = snapshot.val(); // Get all jerseys data
        const dropdown = document.getElementById("jerseyNumber");

        // Clear current options
        dropdown.innerHTML = '';

        // Add new options from the database
        for (let key in jerseys) {
          const option = document.createElement("option");
          option.value = jerseys[key].jerseyNumber;
          option.textContent = `Jersey #${jerseys[key].jerseyNumber} - ${jerseys[key].status}`;
          dropdown.appendChild(option);
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Call the function to populate the jersey dropdown
populateJerseyNumbers();
