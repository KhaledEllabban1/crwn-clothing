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
import CollectionPage from './pages/collection/collection.component';
// 
import { fetchCollectionStartAsyc } from './redux/shop/shop.action';
import { selectIsCollectionsLoaded } from './redux/shop/shop.selector';
import WithSpinner from './components/with-spinner/with-spinner.component';
const CollectionPageWithSpinner = WithSpinner(CollectionPage);



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
    const { isCollectionloaded } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact  path='/' component={HomePage}  />
          <Route exact  path='/shop' component={ShopPage}  />
          <Route path='/shop/:collectionId' render={ props => ( <CollectionPageWithSpinner isLoading = { !isCollectionloaded } {...props} /> )} />     
          <Route exact  path='/checkout' component={CheckOut}  />
          <Route exact  path='/contact' render = { () => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />) }  />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCollectionloaded : selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)),
  fetchCollectionStartAsyc : collectionMap => dispatch(fetchCollectionStartAsyc(collectionMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
