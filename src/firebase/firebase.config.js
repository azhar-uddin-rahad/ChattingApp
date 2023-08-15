// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBABFlQdGPJvcB5fVpJYgXuD5JDJzNi-tY",
  authDomain: "chatting-app-cb975.firebaseapp.com",
  projectId: "chatting-app-cb975",
  storageBucket: "chatting-app-cb975.appspot.com",
  messagingSenderId: "380917714052",
  appId: "1:380917714052:web:4e79c58d953f3bf4cbc6d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;