import React from 'react';

import {connect} from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

// import CustomButton from '../custom-button/custom-button.component';

// import './collection-item.styles.scss';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from './collection-item.styles';

const CollectionItem = ({item, addItem}) => {
  const { id, imageUrl, name, price}  = item;
   return(
    <CollectionItemContainer key={id}>
        <BackgroundImage
          className='image'
          style = {{
            backgroundImage : `url(${imageUrl})`
          }}
        />
        <CollectionFooterContainer>
          <NameContainer> {name} </NameContainer>
          <PriceContainer> {price} </PriceContainer>
        </CollectionFooterContainer>

        <AddButton inverted onClick={ () => addItem(item)}> add to cart  </AddButton>

    </CollectionItemContainer>
)};

const mapDispatchToProps = dispatch => ({
   addItem : item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);