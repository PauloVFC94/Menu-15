import React from 'react';
import PropTypes from 'prop-types';

function PrincipalRecipeCard({ type, recipe, index }) {
  return (
    <span data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
        width="200px"
      />
      <p>{ recipe[`str${type}`] }</p>
    </span>
  );
}

PrincipalRecipeCard.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;

export default PrincipalRecipeCard;
