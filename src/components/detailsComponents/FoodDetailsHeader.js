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
          <h1 data-testid="recipe-title">{ title }</h1>
          <h4 data-testid="recipe-category">{ category }</h4>
        </div>
      </div>
      <div id="button-div" className="d-flex flex-row">
        <div>
          <button
            type="button"
            className="btn-details"
            onClick={ (event) => shareFunction(event, path) }
          >
            <img
              src={ shareIcon }
              alt="share-icon"
              data-testid="share-btn"
              className="img-share"
            />
          </button>
          { isFavorite ? (
            <button
              type="button"
              onClick={ (event) => removeFavorite(event, id, setIsFavorite) }
              className="btn-details"
            >
              <img
                src={ favoriteIcon2 }
                alt="favorite-icon"
                data-testid="favorite-btn"
                className="img-favorite"
              />
            </button>
          ) : (
            <button
              className="btn-details"
              type="button"
              onClick={ (event) => favoriteFunction(event, details, setIsFavorite) }
            >
              <img
                src={ favoriteIcon }
                alt="favorite-icon"
                data-testid="favorite-btn"
                className="img-favorite"
              />
            </button>
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
