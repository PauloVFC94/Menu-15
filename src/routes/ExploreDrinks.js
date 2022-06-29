import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

  const exploreDrinksIgredient = () => {
    history.push('/explore/Drinks/ingredients');
  };

  const exploreDrinksSurprise = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { meals } = await response.json();
    const id = meals[0].idMeal;
    history.push(`/Drinks/${id}`);
  };
  return (
    <>
      <Header title="Explore Drinks" />
      <button
        type="button"
        data-testId="explore-by-ingredient"
        onClick={ exploreDrinksIgredient }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testId="explore-surprise"
        onClick={ exploreDrinksSurprise }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
