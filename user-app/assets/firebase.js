// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
          apiKey: "YOUR-CRED",
          authDomain: "YOUR-CRED",
          projectId: "YOUR-CRED",
          storageBucket: "YOUR-CRED",
          messagingSenderId: "YOUR-CRED",
          appId: "YOUR-CRED",
          measurementId: "YOUR-CRED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = initializeFirestore(app, {experimentalForceLongPolling: true});
const analytics = getAnalytics(app);
export { database };