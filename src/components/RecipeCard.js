import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ type, recipe, index }) {
  return (
    <span
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ `${recipe[`str${type}`]} thumbnail` }
        data-testid={ `${index}-card-img` }
        width="200px"
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        {recipe[`str${type}`]}
      </p>
    </span>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCard;
