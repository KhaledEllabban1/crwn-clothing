import firebase from  'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAkZpflmA3rBh2tguZN1ed1fNM8DQK6lz4",
    authDomain: "crown-last.firebaseapp.com",
    projectId: "crown-last",
    storageBucket: "crown-last.appspot.com",
    messagingSenderId: "209273147395",
    appId: "1:209273147395:web:e2aafd6e901a8f81813e36",
    measurementId: "G-VQ00EN60X7"
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

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI( title.toLowerCase() ),
            id: doc.id,
            title,
            items
        }
    });
    // console.log(transformCollection)

    return transformCollection.reduce( (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {} );
};



firebase.initializeApp(config);

export const getCurrentUser = () => {
    return new Promise( (resolve, reject) => {
        const unsubscrib = auth.onAuthStateChanged(userAuth => {
            unsubscrib();
            resolve(userAuth);
        }, reject);
    });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt : 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;