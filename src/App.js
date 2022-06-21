import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Details from './pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:recipeId" component={ Details } />
      <Route path="/drinks/:recipeId" component={ Details } />
    </Switch>
  );
}

export default App;
