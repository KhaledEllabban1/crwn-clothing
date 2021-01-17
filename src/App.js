import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage.component';

const HatsPage = (props) => (
  <div>
    {    console.log(props)}
    <h1> Hats Page </h1>
  </div>
)

const JacketPage = (props) => {
  return(
    <div>
      <h1> Jacket Pages </h1>
      <Link to='/jacket/15'> Jacket Id </Link>
      <button onClick={ () => props.history.push('/hats') }>Homepage</button>
      <Link to={ `${props.match.url}/21`}> topic 21 </Link>
      <Link to={ `${props.match.url}/15`}> topic 15 </Link>
      <Link to={ `${props.match.url}/13`}> topic 13 </Link>
    </div>
  );
};
const JacketDetails = (props) => {
  console.log(props);
  return(
    <div>
      <h1> JacketDetails Page: { props.match.params.jacketId } </h1>
    </div>
  );
};

function App() {
  return (
    <div>
      
        <Route exact  path='/' component={HomePage}  />
        <Route exact  path='/hats' component={HatsPage}  />
        <Route exact  path='/jacket' component={JacketPage}  />
        <Route exact  path='/jacket/:jacketId' component={JacketDetails}  />
      
    </div>
  );
}

export default App;
