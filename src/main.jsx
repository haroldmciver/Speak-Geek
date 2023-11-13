import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "shellhacksvanguardinvest.firebaseapp.com",
  databaseURL: "https://shellhacksvanguardinvest-default-rtdb.firebaseio.com",
  projectId: "shellhacksvanguardinvest",
  storageBucket: "shellhacksvanguardinvest.appspot.com",
  messagingSenderId: "86449418881",
  appId: "1:86449418881:web:80c7bdc10a53fb46709380",
  measurementId: "G-8GC9S5DEF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
