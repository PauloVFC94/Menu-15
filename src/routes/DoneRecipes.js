import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import './DoneRecipes.css';

function DoneRecipes() {
  const [copyMsg, setCopyMsg] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const copiedMsg = () => {
    const MSG_TIME = 3000;
    setCopyMsg(true);
    setTimeout(setCopyMsg, MSG_TIME, false);
  };

  const setFilter = (filterType) => {
    switch (filterType) {
    case 'food':
      return setFilteredRecipes(doneRecipes.filter(({ type }) => type === 'food'));
    case 'drink':
      return setFilteredRecipes(doneRecipes.filter(({ type }) => type === 'drink'));
    default:
      return setFilteredRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  };

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);
  return (
    <>
      <div className="done-header">
        <Header title="Done Recipes" />
      </div>
      <div className="done-recipe-btn">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      { copyMsg
        ? (
          <div className="alert">
            Link copied!
          </div>
        ) : (
          <span hidden>Oi!!</span>
        ) }

      { filteredRecipes.map((recipe, index) => (
        <DoneRecipeCard
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
