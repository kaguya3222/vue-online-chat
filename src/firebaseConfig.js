import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCsbCw8VWSpVlSUWRiSFiCREFOSVxT2A8g",
  authDomain: "vue-firebase-66d17.firebaseapp.com",
  databaseURL: "https://vue-firebase-66d17.firebaseio.com",
  projectId: "vue-firebase-66d17",
  storageBucket: "vue-firebase-66d17.appspot.com",
  messagingSenderId: "537247976860",
  appId: "1:537247976860:web:1f700d5b6e9a8a44e60c59",
  measurementId: "G-E1KE01G0F8"
};

firebase.initializeApp(config);
const database = firebase.database();
const firebaseAuthentication = firebase.auth();
const messagesRef = database.ref("messages");
const usersRef = database.ref("users");
firebaseAuthentication.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { messagesRef, usersRef, firebaseAuthentication };
