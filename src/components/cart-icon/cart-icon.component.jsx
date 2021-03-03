import React from 'react';
// import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount  } from '../../redux/cart/cart.selectors';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
// import './cart-icon.styles.scss';
import {
    CartIconContainer,
    ShoppingIcon,
    ItemCountContainer
} from './cart-icon.styles';

const CartIcon = ({toggleCartHidden, itemCount}) => (
   <CartIconContainer onClick={toggleCartHidden}>
       <ShoppingIcon className='shopping-icon' />
       <ItemCountContainer> {itemCount} </ItemCountContainer>
   </CartIconContainer>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);