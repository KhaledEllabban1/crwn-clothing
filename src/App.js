import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { auth, createUserProfilDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// 
import CollectionPageContainer from './pages/collection/collection.container';
import { fetchCollectionStartAsyc } from './redux/shop/shop.action';

// import { render } from '@testing-library/react';

class App extends React.Component {

  unsubscribFromAuth = null;
  

  componentDidMount(){
    const { setCurrentUser, fetchCollectionStartAsyc } = this.props;
    fetchCollectionStartAsyc();
    this.unsubscribFromAuth = auth.onAuthStateChanged( async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfilDocument(userAuth);
       
          userRef.onSnapshot(snapShot => {
            setCurrentUser({              
                id : snapShot.id,
                ...snapShot.data()
            });             
          });
      } else {
        setCurrentUser( userAuth );
      }

    });
  }
  componentWillUnmount() {
    this.unsubscribFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact  path='/' component={HomePage}  />
          <Route exact  path='/shop' component={ShopPage}  />
          <Route path='/shop/:collectionId' component={CollectionPageContainer} />     
          <Route exact  path='/checkout' component={CheckOut}  />
          <Route exact  path='/contact' render = { () => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />) }  />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)),
  fetchCollectionStartAsyc : collectionMap => dispatch(fetchCollectionStartAsyc(collectionMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
