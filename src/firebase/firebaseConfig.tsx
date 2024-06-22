// firebaseConfig.js
import { initializeApp } from 'firebase/app';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlz8aaYAl7WcdUFC3reKpSWPEUF1NRzD4",
  authDomain: "miniproyecto2-f96aa.firebaseapp.com",
  projectId: "miniproyecto2-f96aa",
  storageBucket: "miniproyecto2-f96aa.appspot.com",
  messagingSenderId: "128213014488",
  appId: "1:128213014488:web:12e4096cc87f8e2b0784ad"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;