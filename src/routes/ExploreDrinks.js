import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  const exploreDrinksIgredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const exploreDrinksSurprise = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { drinks } = await response.json();
    const id = drinks[0].idDrink;
    console.log(id);
    history.push(`/drinks/${id}`);
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
