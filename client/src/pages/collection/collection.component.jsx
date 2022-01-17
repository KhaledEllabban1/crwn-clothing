import React from 'react';

// import './collection.styles.scss';

import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector'

import CollectionItem from '../../components/collection-item/collection-item.component';

import {
    CollectionPageContainer,
    TitleContainer,
    ItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
    const { items, title } = collection;
    return(
    <CollectionPageContainer>
        <TitleContainer> {title} </TitleContainer>
        <ItemsContainer>
            {
                items.map(
                    item => ( <CollectionItem key={item.id} item = {item} /> )
                )
            }
        </ItemsContainer>
    </CollectionPageContainer>
)};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
