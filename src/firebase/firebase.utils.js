import firebase from  'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDM9QfupPNVrg7LtPDR5GcQd2w3vp6bEYA",
    authDomain: "crwn-db-2a711.firebaseapp.com",
    projectId: "crwn-db-2a711",
    storageBucket: "crwn-db-2a711.appspot.com",
    messagingSenderId: "727751544634",
    appId: "1:727751544634:web:03c467cc97d9e1d6378a03",
    measurementId: "G-6BC1JX4WH1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt : 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;