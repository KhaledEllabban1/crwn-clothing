import React, {useEffect} from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCollectionStart } from '../../redux/shop/shop.action';

import './shop.styles.scss';

import CollectionPageContainer from '../collection/collection.container';
import CollectionOverViewContainer from '../../components/collections-overview/collection-overview.container';


const ShopPage = ({fetchCollectionStart, match}) => {

    useEffect( () => {
        fetchCollectionStart();
    }, [fetchCollectionStart]);
    
        return (
            <div className='shop-page'>
                <Route exact  path={`${match.path}`} component={CollectionOverViewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}  />
                {/* this is not working it's working from app.js and here not working in nested routes!!!! */}
            </div>
        );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart : () => dispatch(fetchCollectionStart())
});
            

export default connect(null, mapDispatchToProps)(ShopPage);