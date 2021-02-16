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

export const createUserProfilDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // console.log(snapShot);

    // console.log(firestore.doc('users/0W6ymxscfffffffffffffff3YQTCfgsfgdfgH2UteRr'));

    if( ! snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user',  error.message );
        }
    }

    return userRef;


};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt : 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;