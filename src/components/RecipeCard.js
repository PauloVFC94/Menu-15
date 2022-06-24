import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RecipeCard({ recipe, index }) {
  const recipeTags = recipe.tags.filter((tag, tagIndex) => tagIndex < 2);
  const history = useHistory();

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ recipe.image }
          alt={ `${recipe.name} thumbnail` }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </button>

      <div>
        { recipe.type === 'food'
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </p>
          ) }
        <img
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </div>

      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <h5 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h5>
      </button>

      <p data-testid={ `${index}-horizontal-done-date` }>
        { `Done in: ${recipe.doneDate}` }
      </p>

      <div>
        { recipeTags.map((tag) => (
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
