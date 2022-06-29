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
    endpoint,
    setDrinksIngredients } = useContext(RecipesContext);
  const DRINKS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const NUMBER_TWELVE = 12;
  const acao = (name) => {
    console.log(name);
    setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    console.log(endpoint);
    history.push('/drinks/');
  };
  useEffect(() => {
    GetByFilter(DRINKS_INGREDIENTS, 'drinks', setDrinksIngredients, NUMBER_TWELVE);
  }, []);
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
            action={ () => { acao(ingredient.strIngredient); } }
          />
        ))
      }
      <Footer />
    </>
  );
}

export default DrinksIngredients;
