const IN_PROGRESS_KEY = 'inProgressRecipes';

export const startInProgressLS = () => {
  if (!localStorage.getItem(IN_PROGRESS_KEY)) {
    localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
};

export const saveInProgressLS = (id, type, number) => {
  const inProgress = JSON.parse(localStorage.getItem(IN_PROGRESS_KEY));
  const category = inProgress[`${type === 'Meal' ? 'meals' : 'cocktails'}`];
  if (!Object.keys(category).length) {
    category[id] = [];
  }
  const recipe = category[id];
  recipe.push(number);
  localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(inProgress));
};

export const removeInProgressLS = (id, type, number) => {
  const inProgress = JSON.parse(localStorage.getItem(IN_PROGRESS_KEY));
  const category = inProgress[`${type === 'Meal' ? 'meals' : 'cocktails'}`];
  category[id] = category[id].filter((ing) => ing !== number);
  if (!category[id].length) {
    delete category[id];
  }
  localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(inProgress));
};

export const getCheckedIngredients = (id, type) => {
  const inProgress = JSON.parse(localStorage.getItem(IN_PROGRESS_KEY));
  const inputs = inProgress[type === 'Meal' ? 'meals' : 'cocktails'][id];
  if (!inputs) {
    return [];
  }
  return inputs;
};
