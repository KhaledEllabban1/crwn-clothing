import React from 'react';
import './cart-item.styles.scss';


import { 
    CartItemContainer,
    CartItemImage,
    ItemDetailsContainer,
    TextContainer
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt='item' />
        <ItemDetailsContainer>
           <TextContainer> {name} </TextContainer>
           <TextContainer> { quantity } x $ { price }  </TextContainer>
        </ItemDetailsContainer>

    </CartItemContainer>
);
export default React.memo(CartItem); 