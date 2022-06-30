import React from 'react';
import PropTypes from 'prop-types';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteIcon2 from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function DrinkDetailsHeader(props) {
  const { id,
    thumbnailDrink,
    titleDrink,
    shareFunction,
    favoriteFunction,
    removeFavorite,
    path,
    details,
    isFavorite,
    alcoholic,
    setIsFavorite } = props;
  return (
    <header>
      <div>
        <div>
          <img
            src={ thumbnailDrink }
            alt={ titleDrink }
            data-testid="recipe-photo"
            className="header-div-img"
          />
        </div>
      </div>
      <div className="header-btn-details">
        <div className="recipe-info-name">
          <h1 data-testid="recipe-title" className="drink-title">{ titleDrink }</h1>
          <h4 data-testid="recipe-category">{ alcoholic }</h4>
        </div>
        <div className="btn-details" id="button-div">
          <input
            type="image"
            src={ shareIcon }
            onClick={ (event) => shareFunction(event, path, true) }
            alt="share-icon"
            data-testid="share-btn"
          />
          { isFavorite ? (
            <input
              type="image"
              onClick={ (event) => removeFavorite(event, id, setIsFavorite) }
              src={ favoriteIcon2 }
              alt="favorite-icon"
              data-testid="favorite-btn"
            />
          ) : (
            <input
              type="image"
              onClick={ (event) => favoriteFunction(event, details, setIsFavorite) }
              src={ favoriteIcon }
              alt="favorite-icon"
              data-testid="favorite-btn"
            />

          )}
        </div>
      </div>
    </header>
  );
}

DrinkDetailsHeader.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnailDrink: PropTypes.string.isRequired,
  titleDrink: PropTypes.string.isRequired,
  shareFunction: PropTypes.func.isRequired,
  favoriteFunction: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  alcoholic: PropTypes.string.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

export default DrinkDetailsHeader;
