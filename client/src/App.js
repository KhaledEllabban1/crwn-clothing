import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import './App.css';
import { GlobalStyle } from  './global.styles';  

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// 
import CollectionPageContainer from './pages/collection/collection.container';
import { fetchCollectionStart } from './redux/shop/shop.action';

// import { render } from '@testing-library/react';
import { auth, createUserProfilDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCollectionForPreview } from './redux/shop/shop.selector';

const App = ({fetchCollectionStart, checkUserSession, currentUser, collectionsArray}) => {

  useEffect( () => {
    fetchCollectionStart();
    checkUserSession();
    addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
  }, [checkUserSession, fetchCollectionStart]);  

  return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact  path='/' component={HomePage}  />
          <Route exact  path='/shop' component={ShopPage}  />
          <Route path='/shop/:collectionId' component={CollectionPageContainer} />     
          <Route exact  path='/checkout' component={CheckOut}  />
          <Route exact  path='/contact' render = { () => currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />) }  />
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray : selectCollectionForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionStart : () => dispatch(fetchCollectionStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(App); 
