import { mealsEndpoints } from './endpoints';

export const shouldRedirectToDetails = (data, endpoint) => data.length === 1
  && !endpoint.includes(mealsEndpoints.searchByCategory);

export const formatDoneRecipe = (data, type) => {
  const date = new Date();
  return {
    id: data[`id${type}`],
    type: type === 'Meal' ? 'food' : 'drink',
    nationality: type === 'Meal' ? data.strArea : '',
    category: type === 'Meal' ? data.strCategory : '',
    alcoholicOrNot: type === 'Drink' ? data.strAlcoholic : '',
    name: data[`str${type}`],
    image: data[`str${type}Thumb`],
    doneDate: date.toLocaleDateString(),
    tags: data.strTags ? data.strTags.split(',') : [],
  };
};
