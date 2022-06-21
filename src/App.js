import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Details from './pages/Details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:recipeId" component={ Details } />
      <Route path="/drinks/:recipeId" component={ Details } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
