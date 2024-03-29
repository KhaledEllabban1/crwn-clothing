import React from 'react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { signOutStart } from '../../redux/user/user.actions'
// import './header.styles.scss';
import './header.styles';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
  } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer  to='/'>
            <Logo className='logo' />
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>

            {
                currentUser ? 
                (<OptionLink as='div' onClick={signOutStart} >  SIGN OUT  </OptionLink>)
                :
                (<OptionLink to='/contact'>  SIGN IN  </OptionLink>)
            }

            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :  <CartDropDown /> 
        }
       


    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden : selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);