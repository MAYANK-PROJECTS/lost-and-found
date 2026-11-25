
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


/* FIREBASE CONFIGURATION */

const firebaseConfig = {
    apiKey: "AIzaSyDoYJUIQTBppnUvsOpYUekUjEXddvmASPo",
    authDomain: "findit-smart-lost-found.firebaseapp.com",
    projectId: "findit-smart-lost-found",
    storageBucket: "findit-smart-lost-found.firebasestorage.app",
    messagingSenderId: "709134542050",
    appId: "1:709134542050:web:e01acb9804449a6a676abb",
    measurementId: "G-52NGP78H50"
};


/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

console.log("FindIt Firebase initialized!");


/* AUTHENTICATION ELEMENTS */

const signupForm = document.getElementById("signupForm");

const loginForm = document.getElementById("loginForm");

const userAccount = document.getElementById("userAccount");

const userDetails = document.getElementById("userDetails");

const logoutButton = document.getElementById("logoutButton");

const authMessage = document.getElementById("authMessage");


/* MESSAGE FUNCTION */

function showMessage(message) {

    if (authMessage) {
        authMessage.textContent = message;
    }

}


/* SIGNUP */

if (signupForm) {

    signupForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();

        const email = document.getElementById("signupEmail").value.trim();

        const password = document.getElementById("signupPassword").value;

        try {

            showMessage("Creating your account...");

            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(result.user, {
                displayName: name
            });

            showMessage("Account created successfully!");

            signupForm.reset();

        } catch (error) {

            showMessage("Signup Error: " + error.message);

        }

    });

}


/* LOGIN */

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        try {

            showMessage("Logging in...");

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            showMessage("Login successful!");

            loginForm.reset();

        } catch (error) {

            showMessage("Login Error: " + error.message);

        }

    });

}


/* LOGOUT */

if (logoutButton) {

    logoutButton.addEventListener("click", async function() {

        try {

            await signOut(auth);

            showMessage("You have logged out successfully.");

        } catch (error) {

            showMessage("Logout Error: " + error.message);

        }

    });

}


/* AUTHENTICATION STATE */

onAuthStateChanged(auth, function(user) {

    if (user) {

        if (signupForm) {
            signupForm.hidden = true;
        }

        if (loginForm) {
            loginForm.hidden = true;
        }

        if (userAccount) {
            userAccount.hidden = false;
        }

        if (userDetails) {

            userDetails.textContent =
                "Name: " + (user.displayName || "FindIt User") +
                " | Email: " + user.email;

        }

    } else {

        if (signupForm) {
            signupForm.hidden = false;
        }

        if (loginForm) {
            loginForm.hidden = false;
        }

        if (userAccount) {
            userAccount.hidden = true;
        }

    }

});
