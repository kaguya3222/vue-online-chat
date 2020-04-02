import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCoVt2-c1pp_GS8RTa2fIxk1fFntZu6-kk",
  authDomain: "vue-online-chat-98a54.firebaseapp.com",
  databaseURL: "https://vue-online-chat-98a54.firebaseio.com",
  projectId: "vue-online-chat-98a54",
  storageBucket: "vue-online-chat-98a54.appspot.com",
  messagingSenderId: "602010413819",
  appId: "1:602010413819:web:ad53a9cbea0c8f5e48de5e"
};

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
