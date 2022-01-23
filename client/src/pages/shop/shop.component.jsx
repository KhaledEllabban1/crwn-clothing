import React, {useEffect, lazy, Suspense} from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCollectionStart } from '../../redux/shop/shop.action';

import Spinner from '../../components/spinner/spinner.component';

import './shop.styles.scss';

// import CollectionPageContainer from '../collection/collection.container';
// import CollectionOverViewContainer from '../../components/collections-overview/collection-overview.container';

const CollectionOverViewContainer = lazy( () => import('../../components/collections-overview/collection-overview.container') );
const CollectionPageContainer = lazy( () => import('../collection/collection.container') );  




const ShopPage = ({fetchCollectionStart, match}) => {

    useEffect( () => {
        fetchCollectionStart();
    }, [fetchCollectionStart]);
    
        return (
            <div className='shop-page'>
                <Suspense fallback = {<Spinner />}>
                    <Route exact  path={`${match.path}`} component={CollectionOverViewContainer} />
                    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}  />
                    {/* this is not working it's working from app.js and here not working in nested routes!!!! */}
                </Suspense>
            </div>
        );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart : () => dispatch(fetchCollectionStart())
});
            

export default connect(null, mapDispatchToProps)(ShopPage);