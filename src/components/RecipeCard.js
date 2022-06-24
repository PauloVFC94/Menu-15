import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RecipeCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.image }
        alt={ `${recipe.name} thumbnail` }
        data-testid={ `${index}-horizontal-image` }
        width="100px"
      />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.nationality} - ${recipe.category}` }
        </p>
        <img
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </div>
      <h5 data-testid={ `${index}-horizontal-name` }>
        { recipe.name }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { `Done in: ${recipe.doneDate}` }
      </p>
      <div>
        { recipe.tags.map((tag) => (
          <span
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { ` ${tag} ` }
          </span>
        )) }
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default RecipeCard;
