import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

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

const App = ({fetchCollectionStart, checkUserSession, currentUser}) => {

  
  useEffect( () => {
    fetchCollectionStart();
    checkUserSession();
  }, [checkUserSession, fetchCollectionStart]);

  return (
      <div>
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionStart : () => dispatch(fetchCollectionStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(App); 
