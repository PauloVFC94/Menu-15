import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
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
      { doneRecipes.map((recipe, index) => (
        <RecipeCard
          recipe={ recipe }
          index={ index }
          key={ recipe.name }
        />
      )) }
    </>
  );
}

export default DoneRecipes;
