import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAI8sH8QsiLH8nLkpxQIyG3ttshD2faQsI",
    authDomain: "mymoney3-7a1d6.firebaseapp.com",
    projectId: "mymoney3-7a1d6",
    storageBucket: "mymoney3-7a1d6.appspot.com",
    messagingSenderId: "491502783031",
    appId: "1:491502783031:web:1099d768a0bca6f73c0db2",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamps
const timestamps = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamps };
