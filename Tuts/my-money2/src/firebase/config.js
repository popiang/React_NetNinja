import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC0vtJY2JWQ-805NaoCMRJrlzycargJzqs",
    authDomain: "mymoney2-a2355.firebaseapp.com",
    projectId: "mymoney2-a2355",
    storageBucket: "mymoney2-a2355.appspot.com",
    messagingSenderId: "530380758363",
    appId: "1:530380758363:web:1b81bacc652ab9f1b8ce7e",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
