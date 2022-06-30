import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  alertAdvice, categoryOrAlcoholic, favoriteButton,
  favoriteImage, getEndpointByPathname, shareButton,
} from '../components/helpers/endpoints';
import { getIngredients, getMeasures } from '../components/helpers/ingredients';
import shareBtn from '../images/shareIcon.svg';
import '../styles/RecipeInProgress.css';
import {
  getCheckedIngredients, removeInProgressLS, saveInProgressLS, startInProgressLS,
} from '../components/helpers/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  formatDoneRecipe } from '../components/helpers/verifiers';

if (!localStorage.getItem('doneRecipes')) {
  localStorage.setItem('doneRecipes', '[]');
}

function RecipeInProgress({ location: { pathname } }) {
  const type = pathname.includes('foods') ? 'Meal' : 'Drink';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [favImage, setFavImage] = useState(whiteHeartIcon);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const endpoint = getEndpointByPathname(pathname);
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        const results = await response.json();
        const [recipe] = results[`${type === 'Meal' ? 'meals' : 'drinks'}`];
        setData(recipe);
        setNumberOfIngredients(getIngredients(recipe).length);
        startInProgressLS();
        setCheckedInputs(getCheckedIngredients(recipe[`id${type}`], type));
        setFavImage(favoriteImage(recipe[`id${type}`]));
        setLoading(false);
      } catch (error) {
        global.alert(alertAdvice);
        setShouldRedirect(true);
        setLoading(false);
      }
    };
    getData();
  }, [pathname, type]);

  const handleCheck = ({ target: { checked, value } }) => {
    if (checked) {
      saveInProgressLS(data[`id${type}`], type, value);
    } else {
      removeInProgressLS(data[`id${type}`], type, value);
    }
    setCheckedInputs(getCheckedIngredients(data[`id${type}`], type));
  };

  const finishRecipe = () => {
    const doneRecipe = formatDoneRecipe(data, type);
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    recipesDone.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    setShouldRedirect(true);
  };

  if (loading) return <p>Carregando...</p>;

  if (shouldRedirect) return <Redirect to="/done-recipes" />;

  return (
    <span className="in-progress-div">
      <span className="header-in-progress">
        <img
          src={ data[`str${type}Thumb`] }
          alt={ `${data[`str${type}`]} thumbnail` }
          data-testid="recipe-photo"
          className="header-in-progress-img"
        />
        <div className="header-btn-details-progress">
          <div className="recipe-info-progress">
            <h1 data-testid="recipe-title">{ data[`str${type}`] }</h1>
            <p
              data-testid="recipe-category"
            >
              { data[`${categoryOrAlcoholic(type)}`] }
            </p>
          </div>
          <div className="btn-details-progress">
            <input
              type="image"
              data-testid="share-btn"
              onClick={ (event) => {
                shareButton(event, pathname.split('/in-progress')[0]);
                setLinkCopied(true);
              } }
              src={ shareBtn }
              alt="share button"
            />
            { linkCopied && <p>Link copied!</p> }
            <input
              type="image"
              onClick={ (event) => {
                favoriteButton(event, data, type);
                setFavImage(favoriteImage(data[`id${type}`]));
              } }
              src={ favImage }
              alt="heart"
              data-testid="favorite-btn"
            />
          </div>
        </div>
      </span>
      <h3>Ingredients</h3>
      <span className="ingredient-box">
        { getIngredients(data).map((ingredient, index) => (
          <label
            key={ `${ingredient}${index}` }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ ingredient }
              type="checkbox"
              value={ index + 1 }
              onChange={ handleCheck }
              checked={ checkedInputs.includes(JSON.stringify(index + 1)) }
            />
            <span>
              {`${ingredient}${
                getMeasures(data)[index] ? ` - ${getMeasures(data)[index]}` : ''
              }`}
            </span>
          </label>
        )) }
      </span>
      <h3>Instructions</h3>
      <p
        data-testid="instructions"
        className="instructions"
      >
        { data.strInstructions }
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="fixedBtn"
        disabled={ numberOfIngredients !== checkedInputs.length }
        onClick={ finishRecipe }
      >
        Finish recipe
      </button>
    </span>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeInProgress;
