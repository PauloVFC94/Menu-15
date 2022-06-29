import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './FavRecipes.css';

function FavRecipes() {
  const favoriteRecipeArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteFood = favoriteRecipeArray.filter((item) => item.type === 'food');
  const favoriteDrink = favoriteRecipeArray.filter((item) => item.type === 'drink');
  console.log(favoriteRecipeArray);
  console.log(favoriteFood);
  console.log(favoriteDrink);
  const [array, setArray] = useState(favoriteRecipeArray);

  const foodButton = () => {
    setArray(favoriteFood);
  };

  const drinkButton = () => {
    setArray(favoriteDrink);
  };

  const allButton = () => {
    setArray(favoriteRecipeArray);
  };

  const shareButtonFav = (event, path, type) => {
    event.preventDefault();
    let link = '';
    if (type === 'food') link = `http://localhost:3000/foods/${path}`;
    else link = `http://localhost:3000/drinks/${path}`;
    copy(link);
    const divBtnCopy = document.getElementById(path);
    const messageCopy = document.createElement('p');
    messageCopy.innerText = 'Link copied!';
    divBtnCopy.appendChild(messageCopy);
  };

  const removeFavoriteRecipe = (event, id) => {
    event.preventDefault();
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteList.filter((recipes) => recipes.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setArray(newFavorites);
  };

  const favoriteLink = (type, id) => {
    if (type === 'food') return `/foods/${id}`;
    return `/drinks/${id}`;
  };

  return (
    <div className="favorite-page">
      <Header title="Favorite Recipes" className="favorite-header" />
      <div className="favorite-filter-btn">
        <button
          type="button"
          onClick={ allButton }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ foodButton }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ drinkButton }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div className="favorite-recipes">
        {array.map((item, index) => (
          <div className="favorite-card" id={ item.id } key={ item.id }>
            <Link
              to={ favoriteLink(item.type, item.id) }
            >
              <img
                className="favorite-img"
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="favorite-itens">
              <div className="favorite-data">
                {item.type === 'food' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.nationality} - ${item.category}` }
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.category} - ${item.alcoholicOrNot}` }
                  </p>
                )}
                <Link
                  to={ favoriteLink(item.type, item.id) }
                >
                  <p
                    className="favorite-name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { item.name }
                  </p>
                </Link>
              </div>
              <div className="favorite-btn">
                <input
                  type="image"
                  onClick={ (event) => shareButtonFav(event, item.id, item.type) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Copiar Link"
                />
                <input
                  type="image"
                  onClick={ (event) => removeFavoriteRecipe(event, item.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Desfavoritar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavRecipes;
