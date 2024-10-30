// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCqB0PUwYB8DcI4qL-9Vrw6J5wI0dYvu0",
  authDomain: "ethical-h.firebaseapp.com",
  projectId: "ethical-h",
  storageBucket: "ethical-h.appspot.com",
  messagingSenderId: "605198548741",
  appId: "1:605198548741:web:a1527dd36442e5ceb2816c",
  measurementId: "G-X3CM0R355Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);