import copy from 'clipboard-copy';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export const mealsEndpoints = {
  random: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  ingredientEndpoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  searchById: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  searchByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
};

export const drinksEndpoints = {
  random: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  ingredientEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  searchById: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  searchByCategory: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
};

export const alertAdvice = 'Sorry, we have a problem';

export const RECIPES_LIMIT = 12;

export const getEndpointByPathname = (pathname) => {
  const recipeId = pathname.replace(/[^0-9]/g, '');
  if (pathname.includes('foods')) return `${mealsEndpoints.searchById}${recipeId}`;
  return `${drinksEndpoints.searchById}${recipeId}`;
};

export const getFoodDetails = async (foodEndPoint) => {
  try {
    const response = await fetch(foodEndPoint);
    const results = await response.json();
    const meals = results.meals[0];
    return (meals);
  } catch (error) {
    global.alert(alertAdvice);
  }
};

export const getDrinkDetails = async (drinkEndPoint) => {
  try {
    const response = await fetch(drinkEndPoint);
    const results = await response.json();
    return (results.drinks[0]);
  } catch (error) {
    global.alert(alertAdvice);
  }
};

export const getFoodRecomendation = async (foodAPI) => {
  try {
    const response = await fetch(foodAPI);
    const results = await response.json();
    return (results);
  } catch (error) {
    global.alert(alertAdvice);
  }
};

export const getDrinkRecomendation = async (drinkAPI) => {
  try {
    const response = await fetch(drinkAPI);
    const results = await response.json();
    return (results);
  } catch (error) {
    global.alert(alertAdvice);
  }
};

export const favoriteFoodButton = (event, recipes, favorite) => {
  event.preventDefault();
  const favoriteObject = {
    id: recipes.idMeal,
    type: 'food',
    nationality: recipes.strArea,
    category: recipes.strCategory,
    alcoholicOrNot: '',
    name: recipes.strMeal,
    image: recipes.strMealThumb,
  };
  const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = [...prevFavorites, favoriteObject];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  if (favorite) {
    favorite(true);
  }
};

export const favoriteDrinkButton = (event, recipes, favorite) => {
  event.preventDefault();
  const favoriteObj = {
    id: recipes.idDrink,
    type: 'drink',
    nationality: '',
    category: recipes.strCategory,
    alcoholicOrNot: recipes.strAlcoholic,
    name: recipes.strDrink,
    image: recipes.strDrinkThumb,
  };
  const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = [...prevFavorites, favoriteObj];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  if (favorite) {
    favorite(true);
  }
};

export const verifyFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    return false;
  }
  const response = favorites.some((recipes) => recipes.id === id);
  return response;
};

export const removeFavorite = (event, id, favorite) => {
  event.preventDefault();
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = favoriteList.filter((recipes) => recipes.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  if (favorite) {
    favorite(false);
  }
};

const mealOrDrinkFavorite = (event, recipe, type) => {
  if (type === 'Meal') {
    favoriteFoodButton(event, recipe, null);
  } else {
    favoriteDrinkButton(event, recipe, null);
  }
};

export const favoriteButton = (event, recipe, type) => {
  if (verifyFavorite(recipe[`id${type}`])) {
    removeFavorite(event, recipe[`id${type}`], null);
  } else {
    mealOrDrinkFavorite(event, recipe, type);
  }
};

export const favoriteImage = (id) => {
  if (verifyFavorite(id)) return blackHeartIcon;
  return whiteHeartIcon;
};

export const verifyDone = (id) => {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  if (done === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    return false;
  }
  const response = done.some((recipes) => recipes.id === id);
  return response;
};

export const verifyinProgressFood = (id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressObj = {
    cocktails: {
    },
    meals: {
    },
  };
  if (inProgress === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    return false;
  }
  if (inProgress === []) return false;
  const response = Object.keys(inProgress.meals).some((recipe) => recipe === id);
  return response;
};

export const verifyinProgressDrink = (id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressObj = {
    cocktails: {
    },
    meals: {
    },
  };
  if (inProgress === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    return false;
  }
  if (inProgress === []) return false;
  const response = Object.keys(inProgress.cocktails).some((recipe) => recipe === id);
  return response;
};

export const shareButton = (event, path, details) => {
  event.preventDefault();
  const link = `http://localhost:3000${path}`;
  copy(link);
  if (details) {
    const divBtnCopy = document.getElementById('button-div');
    const messageCopy = document.createElement('p');
    messageCopy.innerText = 'Link copied!';
    divBtnCopy.appendChild(messageCopy);
  }
};

export const getLink = (detailsRecipe) => {
  const linkYoutube = Object.entries(detailsRecipe)[8][1];
  const idLink = linkYoutube.split('=')[1];
  const videoUrl = `https://www.youtube.com/embed/${idLink}`;
  return videoUrl;
};

export const categoryOrAlcoholic = (type) => (
  type === 'Meal' ? 'strCategory' : 'strAlcoholic');
