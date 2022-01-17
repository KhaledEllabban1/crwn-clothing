import firebase from  'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBkWXroLh9uVqnWJZV1lakciKnPH2_FXn0",
    authDomain: "crwn-db-79837.firebaseapp.com",
    projectId: "crwn-db-79837",
    storageBucket: "crwn-db-79837.appspot.com",
    messagingSenderId: "414211788498",
    appId: "1:414211788498:web:397137640e65008d94a70b",
    measurementId: "G-BBFBVSW05D"  
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
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      console.log(newDocRef);
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