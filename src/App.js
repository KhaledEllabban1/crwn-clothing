import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { auth, createUserProfilDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import { render } from '@testing-library/react';



class App extends React.Component {

  unsubscribFromAuth = null;
  

  componentDidMount(){
    const { setCurrentUser } = this.props;
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
          <Route exact  path='/contact' render = { () => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />) }  />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
