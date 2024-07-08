import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAI-u_Sc9Id0kuxDOLZPPiIHazwRmeglZ4",
  authDomain: "financeapp-b747b.firebaseapp.com",
  databaseURL: "https://financeapp-b747b-default-rtdb.firebaseio.com",
  projectId: "financeapp-b747b",
  storageBucket: "financeapp-b747b.appspot.com",
  messagingSenderId: "867883858117",
  appId: "1:867883858117:web:a2bca8d35bd9f0250358ac",
  measurementId: "G-6LZ8ZTDN7K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
