import { ShopActionTypes } from './shop.types';

import { 
    convertCollectionsSnapshotToMap,
    firestore 
} from '../../firebase/firebase.utils';


export const fetchCollectionStart = () => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload : errorMessage
});

export const fetchCollectionStartAsyc = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch( fetchCollectionStart() );

        collectionRef.get().then( async snapshot => {
            const collectionMap =  convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
            
         })
         .catch( error => dispatch(fetchCollectionFailure(error.message)) );
    }
};