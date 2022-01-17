import React from 'react';

// import './cart-dropdown.styles.scss';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.components';

// import CustomButton from '../custom-button/custom-button.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
    CartDropDownContainer,
    CartItemContainer,
    EmptyMessageContainer,
    CartDropDownButton
} from './cart-dropdown.styles';

const CartDropDown = ({ cartItems, history, dispatch }) => (
    <CartDropDownContainer>
        
        <CartItemContainer>
        {
            cartItems.length ?
            cartItems.map( cartItem => 
                <CartItem key={cartItem.id} item={cartItem} />
                ) 
            : ( <EmptyMessageContainer> The Cart is empty </EmptyMessageContainer> )

        }
        </CartItemContainer>

        <CartDropDownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
            }}> GO TO CHECKOUT 
        </CartDropDownButton>

    </CartDropDownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown));