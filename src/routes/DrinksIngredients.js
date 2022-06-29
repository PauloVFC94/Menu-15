import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

function DrinksIngredients() {
  const { drinksIngredients } = useContext(RecipesContext);
  return (
    <>
      <Header title="Explore Ingredients" />
      {
        drinksIngredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.strIngredient1 }
            name={ ingredient.strIngredient1 }
            imageSrc={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            testId={ `${index}-ingredient-card` }
            testImageId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
          />
        ))
      }
      <Footer />
    </>
  );
}

export default DrinksIngredients;
