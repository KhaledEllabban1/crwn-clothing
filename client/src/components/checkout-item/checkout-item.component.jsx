import React from 'react';

import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';


// import './checkout-item.styles.scss';

import { 
    CheckOutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';

const CheckOutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    return(
    <CheckOutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt="item"/>
        </ImageContainer>
        <TextContainer> {name}  </TextContainer>
        <QuantityContainer>
            <div className='arrow' onClick={ () => removeItem(cartItem) }> &#10094;   </div> 
            <span className='value'> {quantity}  </span>
            <div className='arrow' onClick={ () => addItem(cartItem) }>  &#10095; </div> 
        </QuantityContainer>
        <TextContainer> {price} </TextContainer>
        <RemoveButtonContainer onClick={ () => clearItem(cartItem) }>  &#10005; </RemoveButtonContainer>
    </CheckOutItemContainer>
)};

const mapDispatchToProps = dispatch =>({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckOutItem);