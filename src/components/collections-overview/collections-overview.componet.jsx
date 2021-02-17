import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => {
    // console.log(collections); // for converting the object to array to make map function work
    return(
    <div className='collections'>
        {
            collections.map( ({id, ...otherCollectionPreview}) => (
                <CollectionPreview  key={id} {...otherCollectionPreview} />
            ))
            
        }
    </div>
)};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);