import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.componet';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

// const CollectionOverViewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
const CollectionOverViewContainer = compose(
    connect(mapStateToProps),
     WithSpinner
)(CollectionsOverview);

export default CollectionOverViewContainer;
