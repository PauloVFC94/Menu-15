import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  console.log(recipe);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.image }
        alt={ `${recipe.name} thumbnail` }
        data-testid={ `${index}-horizontal-image` }
        width="150px"
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe.nationality} - ${recipe.category}` }
      </p>
      <h5 data-testid={ `${index}-horizontal-name` }>
        { recipe.name }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { `Done in: ${recipe.doneDate}` }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default RecipeCard;
