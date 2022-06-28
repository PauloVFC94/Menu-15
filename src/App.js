import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Foods from './routes/Foods';
import Drinks from './routes/Drinks';
import Explore from './routes/Explore';
import ExploreFoods from './routes/ExploreFoods';
import ExploreDrinks from './routes/ExploreDrinks';
import FoodsIngredients from './routes/FoodsIngredients';
import DrinksIngredients from './routes/DrinksIngredients';
import FoodsNationalities from './routes/FoodsNationalities';
import Profile from './routes/Profile';
import DoneRecipes from './routes/DoneRecipes';
import FavRecipes from './routes/FavRecipes';
import './App.css';
import Login from './routes/Login';
import FoodDetails from './routes/FoodDetails';
import DrinkDetails from './routes/DrinkDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeInProgress from './routes/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/foods/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:recipeId/in-progress" component={ RecipeInProgress } />
        <Route exact path="/foods/:recipeId" component={ FoodDetails } />
        <Route exatc path="/drinks/:recipeId" component={ DrinkDetails } />
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
