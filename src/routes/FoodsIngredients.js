import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodsIngredients() {
  const { mealsIngredients } = useContext(RecipesContext);
  return (
    <>
      <Header title="Explore Ingredients" />
      {
        mealsIngredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.idIngredient }
            name={ ingredient.strIngredient }
            imageSrc={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
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

export default FoodsIngredients;
