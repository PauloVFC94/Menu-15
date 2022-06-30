import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

function DrinksIngredients() {
  const history = useHistory();
  const {
    GetByFilter,
    drinksIngredients,
    setEndpoint,
    setDrinksIngredients } = useContext(RecipesContext);
  const DRINKS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const NUMBER_TWELVE = 12;
  const acao = (name) => {
    setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    history.push('/drinks/');
  };
  useEffect(() => {
    GetByFilter(DRINKS_INGREDIENTS, 'drinks', setDrinksIngredients, NUMBER_TWELVE);
  }, [GetByFilter, setDrinksIngredients]);
  return (
    <>
      <Header title="Explore Ingredients" />
      {
        drinksIngredients.map((ingredient, index) => (
          // console.log(ingredient, index)
          <IngredientCard
            key={ ingredient.strIngredient1 }
            name={ ingredient.strIngredient1 }
            imageSrc={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            testId={ `${index}-ingredient-card` }
            testImageId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
            action={ () => { acao(ingredient.strIngredient1); } }
          />
        ))
      }
      <Footer />
    </>
  );
}

export default DrinksIngredients;
