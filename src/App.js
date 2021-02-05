import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { auth, createUserProfilDocument } from './firebase/firebase.utils';
import { render } from '@testing-library/react';



class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser : null
    };
  }

  unsubscribFromAuth = null;

  componentDidMount(){
    this.unsubscribFromAuth = auth.onAuthStateChanged( async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfilDocument(userAuth);
  
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser : {
                id : snapShot.id,
                ...snapShot.data()
              }
            }
            // ,() => console.log( this.state.currentUser)
             );
          });
      } else {
        this.setState({ currentUser : userAuth });
      }

    });
  }
  componentWillUnmount() {
    this.unsubscribFromAuth();
  }


  render() {
    return (
      <div>
        <Header  currentUser = {this.state.currentUser }/>
        <Switch>
          <Route exact  path='/' component={HomePage}  />
          <Route exact  path='/shop' component={ShopPage}  />
          <Route exact  path='/contact' component={SignInAndSignOutPage}  />
          </Switch>
      </div>
    );
  }
}

export default App;
