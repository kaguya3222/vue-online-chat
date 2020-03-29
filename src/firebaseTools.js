import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "../private/firebaseConfig";

firebase.initializeApp(firebaseConfig);
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
