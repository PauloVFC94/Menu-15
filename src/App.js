import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Foods from './Routes/Foods';
import Drinks from './Routes/Drinks';
import Explore from './Routes/Explore';
import ExploreFoods from './Routes/ExploreFoods';
import ExploreDrinks from './Routes/ExploreDrinks';
import FoodsIngredients from './Routes/FoodsIngredients';
import DrinksIngredients from './Routes/DrinksIngredients';
import FoodsNationalities from './Routes/FoodsNationalities';
import Profile from './Routes/Profile';
import DoneRecipes from './Routes/DoneRecipes';
import FavRecipes from './Routes/FavRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/"><h1>Login</h1></Route>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavRecipes } />
      </Switch>
    </div>
  );
}

export default App;
