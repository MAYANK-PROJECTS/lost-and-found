import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDoYJUIQTBppnUvsOpYUekUjEXddvmASPo",
  authDomain: "findit-smart-lost-found.firebaseapp.com",
  projectId: "findit-smart-lost-found",
  storageBucket: "findit-smart-lost-found.firebasestorage.app",
  messagingSenderId: "709134542050",
  appId: "1:709134542050:web:e01acb9804449a6a676abb",
  measurementId: "G-52NGP78H50"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

console.log("FindIt Firebase initialized!");
