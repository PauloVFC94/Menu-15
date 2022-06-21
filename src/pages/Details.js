import React from 'react';
import PropTypes from 'prop-types';

function Details({ match: { params: { recipeId } } }) {
  return (
    <p>
      {`this is the details page, and the selected recipe is ${recipeId}`}
    </p>
  );
}

Details.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Details;
