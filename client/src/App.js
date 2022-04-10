import React, { useEffect, lazy,Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import './App.css';
import { GlobalStyle } from  './global.styles';  

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
// import HomePage from './pages/homepage/homepage.component';

import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// 
import { fetchCollectionStart } from './redux/shop/shop.action';

const HomePage = lazy( () => import('./pages/homepage/homepage.component') );
const ShopPage = lazy( () => import('./pages/shop/shop.component') );
const CheckOut = lazy( () => import('./pages/checkout/checkout.component') );
const SignInAndSignOutPage = lazy( () => import('./pages/sign-in-and-sign-out/sign-in-and-sign-out.component') );
const CollectionPageContainer = lazy( () => import('./pages/collection/collection.container') );

// import { render } from '@testing-library/react';

const App = ({fetchCollectionStart, checkUserSession, currentUser}) => {

  useEffect( () => {
    fetchCollectionStart();
    checkUserSession();
  }, [checkUserSession, fetchCollectionStart]);  

  return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
           <Suspense fallback = {<Spinner />}>
              <Route exact  path='/crwn-clothing' component={HomePage}  />
              <Route exact  path='/crwn-clothing/shop' component={ShopPage}  />
              <Route path='/crwn-clothing/shop/:collectionId' component={CollectionPageContainer} />     
              <Route exact  path='/crwn-clothing/checkout' component={CheckOut}  />
              <Route exact  path='/crwn-clothing/contact' render = { () => currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />) }  />
           </Suspense>
          </ErrorBoundary>
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
