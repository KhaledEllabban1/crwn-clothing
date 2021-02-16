import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shopSelectorCollections } from '../../redux/shop/shop.selector';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
    <div className='collections'>
        {
            collections.map( ({id, ...otherCollectionPreview}) => (
                <CollectionPreview  key={id} {...otherCollectionPreview} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: shopSelectorCollections
});

export default connect(mapStateToProps)(CollectionsOverview);