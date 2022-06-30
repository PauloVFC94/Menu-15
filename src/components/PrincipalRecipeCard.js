import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './PrincipalRecipeCard.css';

function PrincipalRecipeCard({ type, recipe, index }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const pathname = type === 'Meal' ? 'foods' : 'drinks';

  if (shouldRedirect) return <Redirect to={ `/${pathname}/${recipe[`id${type}`]}` } />;

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => setShouldRedirect(true) }
      className="card-container-principal"
    >
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
        width="200px"
        data-testid={ `${index}-card-img` }
        className="card-principal-image"
      />
      <h4 data-testid={ `${index}-card-name` } className="card-recipe-name">
        { recipe[`str${type}`] }
      </h4>
    </button>
  );
}

PrincipalRecipeCard.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;

export default PrincipalRecipeCard;
