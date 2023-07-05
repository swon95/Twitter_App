import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // YOUR CONFIG HERE
  apiKey: "AIzaSyDeNIYxJ0qwmFbnsWP2VCBT2LQAL_5Cp-g",
  authDomain: "qwitter-304b1.firebaseapp.com",
  projectId: "qwitter-304b1",
  storageBucket: "qwitter-304b1.appspot.com",
  messagingSenderId: "321818273135",
  appId: "1:321818273135:web:53e695ea70c2e139c5b49a",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
