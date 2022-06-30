import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import DrinkCarousel from '../components/detailsComponents/DrinkCarousel';
import DrinkDetailsHeader from '../components/detailsComponents/DrinkDetailsHeader';
import { getDrinkDetails,
  getDrinkRecomendation,
  favoriteDrinkButton,
  verifyFavorite,
  verifyDone,
  verifyinProgressDrink,
  shareButton,
  removeFavorite } from '../components/helpers/endpoints';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/detailsComponents/DrinkDetails.css';

const drinkRecomendationURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const LIMIT_RECOMENDATIONS = 6;

function DrinkDetails({ match: { params: { recipeId } } }) {
  const drinkEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const { history } = useContext(RecipesContext);
  const { pathname } = history.location;

  const [detailsRecipe, setDetailsRecipe] = useState({});
  useEffect(() => {
    const detailAPI = async () => {
      const drinkDetails = await getDrinkDetails(drinkEndPoint);
      setDetailsRecipe(drinkDetails);
    };
    detailAPI();
  }, [drinkEndPoint]);
  console.log(detailsRecipe);

  const [loading, setLoading] = useState(false);
  const [recomendation, setRecomendation] = useState([]);
  useEffect(() => {
    const recomendationAPI = async () => {
      const drinkRecomendation = await getDrinkRecomendation(drinkRecomendationURL);
      setRecomendation(drinkRecomendation.meals);
      setLoading(true);
    };
    recomendationAPI();
  }, []);

  const rec = Object.values(recomendation).slice(0, LIMIT_RECOMENDATIONS);
  const recomendationObject = rec.map((recipe) => {
    const obj = {
      strMealThumb: recipe.strMealThumb,
      strMeal: recipe.strMeal,
      strCategory: recipe.strCategory,
      idMeal: recipe.idMeal,
    };
    return obj;
  });
  console.log(recomendationObject);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    setIsFavorite(verifyFavorite(recipeId));
    setIsDone(verifyDone(recipeId));
    setIsInProgress(verifyinProgressDrink(recipeId));
  }, [recipeId]);

  const startRecipeButton = (event) => {
    event.preventDefault();
    history.push(`/drinks/${recipeId}/in-progress`);
  };

  const array = Object.keys(detailsRecipe);
  const ingredients = array.filter((category) => category.includes('strIngredient'));
  const measures = array.filter((category) => category.includes('strMeasure'));

  return (
    <div className="main-div-drink-details">
      { loading ? (
        <div className="header-div">
          <DrinkDetailsHeader
            id={ recipeId }
            thumbnailDrink={ detailsRecipe.strDrinkThumb }
            titleDrink={ detailsRecipe.strDrink }
            shareFunction={ shareButton }
            favoriteFunction={ favoriteDrinkButton }
            path={ pathname }
            isFavorite={ isFavorite }
            removeFavorite={ removeFavorite }
            details={ detailsRecipe }
            alcoholic={ detailsRecipe.strAlcoholic }
            category={ detailsRecipe.strCategory }
            setIsFavorite={ setIsFavorite }
          />
          <h2>Ingredients</h2>
          <div className="drink-ingredients">
            { ingredients.map((ingredient, i) => (
              (detailsRecipe[ingredients[i]] !== null) && (
                <p
                  key={ `ingrediente ${i}` }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  { `${detailsRecipe[measures[i]]} ${detailsRecipe[ingredients[i]]}` }
                </p>
              )
            ))}
          </div>
          <h2>Instructions</h2>
          <p
            className="drink-instructions"
            data-testid="instructions"
          >
            { detailsRecipe.strInstructions }
          </p>
          <h2>Recomendations</h2>
          <div>
            <div id="carousel">
              <DrinkCarousel
                i1={ recomendationObject[0] }
                i2={ recomendationObject[1] }
                i3={ recomendationObject[2] }
                i4={ recomendationObject[3] }
                i5={ recomendationObject[4] }
                i6={ recomendationObject[5] }
              />
            </div>
          </div>
          { isDone ? (null) : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ (event) => startRecipeButton(event) }
            >
              { isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </div>
      ) : (<p>loading</p>)}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetails;
