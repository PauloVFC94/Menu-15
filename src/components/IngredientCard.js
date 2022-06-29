import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ name, imageSrc, testId, testImageId, testNameId }) {
  return (
    <button
      type="button"
      data-testid={ testId }
    >
      <img
        src={ imageSrc }
        alt={ `Foto do ${name}` }
        data-testid={ testImageId }
      />
      <span data-testid={ testNameId }>{ name }</span>
    </button>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  testImageId: PropTypes.string.isRequired,
  testNameId: PropTypes.string.isRequired,
};

export default IngredientCard;
