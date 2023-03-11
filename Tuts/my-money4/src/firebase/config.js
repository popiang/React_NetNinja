import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDETQdcbs9Ijb9NRoajhQfmqgiXw_hss08",
    authDomain: "mymoney4-a02e3.firebaseapp.com",
    projectId: "mymoney4-a02e3",
    storageBucket: "mymoney4-a02e3.appspot.com",
    messagingSenderId: "125963215282",
    appId: "1:125963215282:web:5f053e63a63c8eede404ab",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth()

// timestamp 
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };