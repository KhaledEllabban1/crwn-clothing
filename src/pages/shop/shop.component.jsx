import React from 'react';

import { Route } from 'react-router-dom';

import './shop.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.componet';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({match}) => (
    <div className='shop-page'>
        <Route exact  path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        {/* this is not working it's working from app.js and here not working in nested routes!!!! */}
    </div>
);
            

export default ShopPage;