import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSNwk3Dqzr2a03dj3U6OxxhkGO0D7_SfM",
    authDomain: "cooking-site-d95d4.firebaseapp.com",
    projectId: "cooking-site-d95d4",
    storageBucket: "cooking-site-d95d4.appspot.com",
    messagingSenderId: "507659085546",
    appId: "1:507659085546:web:0a2f8073e387f4ba885993"
  };
  //initialize firebase
  firebase.initializeApp(firebaseConfig);

  //initialize services
  const projectFirestore = firebase.firestore();

    export { projectFirestore };