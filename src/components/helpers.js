export const mealsEndpoints = {
  ingredientEndpoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  searchById: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};

export const drinksEndpoints = {
  ingredientEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  searchById: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
};

export const RECIPES_LIMIT = 12;

export const getEndpointByPathname = (pathname) => {
  const recipeId = pathname.replace(/[^0-9]/g, '');
  if (pathname.includes('foods')) return `${mealsEndpoints.searchById}${recipeId}`;
  return `${drinksEndpoints.searchById}${recipeId}`;
};

export const getIngredients = (data) => (
  Object.entries(data)
    .filter(([element]) => element.includes('strIngredient'))
    .filter(([, ingredient]) => ingredient && ingredient !== '')
    .map(([, ingredient]) => {
      const name = ingredient.split('');
      name[0] = name[0].toUpperCase();
      return name.join('');
    })
);

export const getMeasures = (data) => (
  Object.entries(data)
    .filter(([element]) => element.includes('strMeasure'))
    .filter(([, measure]) => measure && measure !== '')
    .map(([, measure]) => measure)
);
