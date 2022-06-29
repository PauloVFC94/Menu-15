import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodsIngredients() {
  const history = useHistory();
  const {
    GetByFilter,
    mealsIngredients,
    setEndpoint,
    endpoint,
    setMealsIngredients } = useContext(RecipesContext);
  const MEALS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const NUMBER_TWELVE = 12;
  const acao = (name) => {
    console.log(name);
    setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    console.log(endpoint);
    history.push('/foods/');
  };
  useEffect(() => {
    GetByFilter(MEALS_INGREDIENTS, 'meals', setMealsIngredients, NUMBER_TWELVE);
  }, []);
  return (
    <>
      <Header title="Explore Ingredients" />
      {
        mealsIngredients.map((ingredient, index) => (
          // console.log(ingredient, index)
          <IngredientCard
            key={ ingredient.idIngredient }
            name={ ingredient.strIngredient }
            imageSrc={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            testId={ `${index}-ingredient-card` }
            testImageId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
            action={ () => { acao(ingredient.strIngredient); } }
          />
        ))
      }
      <Footer />
    </>
  );
}

export default FoodsIngredients;
