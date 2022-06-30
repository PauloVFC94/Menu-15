import React from 'react';
import PropTypes from 'prop-types';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteIcon2 from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function FoodDetailsHeader(props) {
  const { id,
    thumbnail,
    title,
    shareFunction,
    favoriteFunction,
    removeFavorite,
    path,
    details,
    isFavorite,
    category,
    setIsFavorite } = props;
  return (
    <header>
      <div>
        <div>
          <img
            src={ thumbnail }
            alt={ title }
            data-testid="recipe-photo"
            className="header-div-img"
          />
        </div>
      </div>
      <div className="header-btn-details">
        <div className="recipe-info-name">
          <h1 data-testid="recipe-title">{ title }</h1>
          <h4 data-testid="recipe-category">{ category }</h4>
        </div>
        <div className="btn-details" id="button-div">
          <input
            type="image"
            className="btn-details"
            onClick={ (event) => shareFunction(event, path, true) }
            src={ shareIcon }
            alt="share-icon"
            data-testid="share-btn"
          />
          { isFavorite ? (
            <input
              type="image"
              onClick={ (event) => removeFavorite(event, id, setIsFavorite) }
              className="btn-details"
              src={ favoriteIcon2 }
              alt="favorite-icon"
              data-testid="favorite-btn"
            />
          ) : (
            <butinputton
              className="btn-details"
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

FoodDetailsHeader.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shareFunction: PropTypes.func.isRequired,
  favoriteFunction: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

export default FoodDetailsHeader;
