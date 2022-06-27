import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import './DoneRecipes.css';

function DoneRecipes() {
  const [copyMsg, setCopyMsg] = useState(false);
  const copiedMsg = () => {
    const MSG_TIME = 3000;
    setCopyMsg(true);
    setTimeout(setCopyMsg, MSG_TIME, false);
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipes);
  return (
    <>
      <Header title="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      { copyMsg
        ? (
          <div className="alert">
            Link copied!
          </div>
        ) : (
          <span hidden>Oi!!</span>
        ) }
      { doneRecipes.map((recipe, index) => (
        <RecipeCard
          copiedMsg={ copiedMsg }
          recipe={ recipe }
          index={ index }
          key={ recipe.name }
        />
      )) }
    </>
  );
}

export default DoneRecipes;
