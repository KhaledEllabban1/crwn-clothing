import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';


import './shop.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.componet';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading:true
    }

    unsubscribeFromSnapshot = null ;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then( async snapshot => {
            const collectionMap =  convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({ loading: false });
         });
       
    }


    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact  path={`${match.path}`} render={ props =>  ( <CollectionsOverviewWithSpinner isLoading = { loading } {...props}  /> )} />
                <Route path={`${match.path}/:collectionId`} render={ props => ( <CollectionPageWithSpinner isLoading = { loading } {...props} /> )} />
                {/* this is not working it's working from app.js and here not working in nested routes!!!! */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections : collectionMap => dispatch(updateCollections(collectionMap))
});
            

export default connect(null, mapDispatchToProps)(ShopPage);