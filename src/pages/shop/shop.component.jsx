import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCollectionStartAsyc } from '../../redux/shop/shop.action';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component';


import './shop.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.componet';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionStartAsyc } = this.props;
        fetchCollectionStartAsyc();
    }

    render() {
        const { match, isCollectionFetching, isCollectionloaded } = this.props;
        return (
            <div className='shop-page'>
                <Route exact  path={`${match.path}`} render={ props =>  ( <CollectionsOverviewWithSpinner isLoading = { isCollectionFetching } {...props}  /> )} />
                <Route path={`${match.path}/:collectionId`} render={ props => ( <CollectionPageWithSpinner isLoading = { !isCollectionloaded } {...props} /> )} />
                {/* this is not working it's working from app.js and here not working in nested routes!!!! */}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionloaded : selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsyc : collectionMap => dispatch(fetchCollectionStartAsyc(collectionMap))
});
            

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);