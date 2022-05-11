
// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE7BdgHMtqXKFaWHn7_iehuTpLsD-hpWI",
  authDomain: "loginsysteem-e038e.firebaseapp.com",
  projectId: "loginsysteem-e038e",
  storageBucket: "loginsysteem-e038e.appspot.com",
  messagingSenderId: "768148928555",
  appId: "1:768148928555:web:b0430e724fb889b912126e"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
//dkfhgvg b