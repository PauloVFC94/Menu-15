import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default App;
