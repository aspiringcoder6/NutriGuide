import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf3wHOlmGw18dq1U7DOmCRk9PMQLL62os",
  authDomain: "nutrition-app-30eea.firebaseapp.com",
  databaseURL: "https://nutrition-app-30eea-default-rtdb.firebaseio.com",
  projectId: "nutrition-app-30eea",
  storageBucket: "nutrition-app-30eea.appspot.com",
  messagingSenderId: "334256008046",
  appId: "1:334256008046:web:834ec6a06f51dac86fef7f",
  measurementId: "G-2WCL7VMMY4",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
