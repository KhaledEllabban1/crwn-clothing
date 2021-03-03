import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selectors';

import  SttipeCheckoutButton from '../../components/sttipe-button/stripe-button.component';

import CheckOutItem from '../../components/checkout-item/checkout-item.component';
// import './checkout.styles.scss';

import {
    CheckOutPageContainer,
    CheckOutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer,
    TestWarningContainer
} from './checkout.styles';

const CheckOut = ({ cartItems, total }) => (
    <CheckOutPageContainer>
        <CheckOutHeaderContainer>
            <HeaderBlockContainer>
                <span> Product </span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span> Description </span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span> Quantity </span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span> Price </span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span> Remove </span>
            </HeaderBlockContainer>
        </CheckOutHeaderContainer>

        {
            cartItems.map( cartItem =>
               <CheckOutItem key={cartItem.id} cartItem={cartItem} />
            )
        }

        <TotalContainer>
            <span> TOTAL: ${total} </span>
        </TotalContainer>
        <TestWarningContainer>
            *Please use the following test credit card for payments*
            <br />
            and see the Token on console after submitting
            <br />
            4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
        </TestWarningContainer>
        <SttipeCheckoutButton price = {total} />
    </CheckOutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total : selectCartItemsTotal
});
export default connect(mapStateToProps)(CheckOut);