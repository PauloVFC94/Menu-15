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
