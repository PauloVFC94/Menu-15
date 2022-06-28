import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import FoodDetailsHeader from '../components/detailsComponents/FoodDetailsHeader';
import FoodCarousel from '../components/detailsComponents/FoodCarousel';
import { getFoodDetails,
  getFoodRecomendation,
  favoriteFoodButton,
  verifyFavorite,
  verifyDone,
  verifyinProgressFood,
  shareButton,
  removeFavorite,
  getLink } from '../components/helpers/endpoints';
import '../components/detailsComponents/FoodDetails.css';

const foodRecomendationURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const LIMIT_RECOMENDATIONS = 6;

function FoodDetails({ match: { params: { recipeId } } }) {
  const foodPath = `/foods/${recipeId}`;
  const foodEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const { history } = useContext(RecipesContext);
  const { pathname } = history.location;

  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [link, setLink] = useState('');
  useEffect(() => {
    const detailAPI = async () => {
      const foodDetails = await getFoodDetails(foodEndPoint);
      setDetailsRecipe(foodDetails);
      setLink(getLink(foodDetails));
    };
    detailAPI();
  }, [foodEndPoint]);

  const [loading, setLoading] = useState(false);
  const [recomendation, setRecomendation] = useState([]);
  useEffect(() => {
    const recomendationAPI = async () => {
      const foodRecomendation = await getFoodRecomendation(foodRecomendationURL);
      setRecomendation(foodRecomendation.drinks);
      setLoading(true);
    };
    recomendationAPI();
  }, []);

  const rec = Object.values(recomendation).slice(0, LIMIT_RECOMENDATIONS);
  const recomendationObject = rec.map((recipe) => {
    const obj = {
      strDrinkThumb: recipe.strDrinkThumb,
      strDrink: recipe.strDrink,
      strAlcoholic: recipe.strAlcoholic,
      idDrink: recipe.idDrink,
    };
    return obj;
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    setIsFavorite(verifyFavorite(recipeId));
    setIsDone(verifyDone(recipeId));
    setIsInProgress(verifyinProgressFood(recipeId));
  }, [recipeId]);

  const startRecipeButton = (event) => {
    event.preventDefault();
    history.push(`/foods/${recipeId}/in-progress`);
  };

  const array = Object.keys(detailsRecipe);
  const ingredients = array.filter((category) => category.includes('strIngredient'));
  const measures = array.filter((category) => category.includes('strMeasure'));

  return (
    <div className="main-div-food-details">
      { loading ? (
        <div className="header-div">
          <FoodDetailsHeader
            id={ recipeId }
            thumbnail={ detailsRecipe.strMealThumb }
            title={ detailsRecipe.strMeal }
            shareFunction={ shareButton }
            favoriteFunction={ favoriteFoodButton }
            path={ pathname }
            foodPath={ foodPath }
            isFavorite={ isFavorite }
            removeFavorite={ removeFavorite }
            details={ detailsRecipe }
            category={ detailsRecipe.strCategory }
            setIsFavorite={ setIsFavorite }
          />
          <h2>Ingredients</h2>
          <div className="food-ingredients">
            { ingredients.map((ingredient, i) => (
              (detailsRecipe[ingredients[i]] !== '') && (
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
            data-testid="instructions"
            className="food-instructions"
          >
            { detailsRecipe.strInstructions }
          </p>
          <h2>Video</h2>
          <iframe
            src={ link }
            title={ detailsRecipe.strMeal }
            data-testid="video"
          />
          <h2>Recomendations</h2>
          <div>
            <div id="carousel">
              <FoodCarousel
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
      ) : (<p>Loading</p>)}
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodDetails;
