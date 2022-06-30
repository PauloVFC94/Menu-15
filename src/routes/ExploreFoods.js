import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './ExploreFoods.css';

function ExploreFoods() {
  const history = useHistory();
  const exploreFoodsIgredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const exploreFoodsNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const exploreFoodsSurprise = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { meals } = await response.json();
    const id = meals[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <>
      <div className="explore-foods-header">
        <Header title="Explore Foods" />
      </div>
      <div className="explore-foods-btn">
        <button
          type="button"
          data-testId="explore-by-ingredient"
          onClick={ exploreFoodsIgredient }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testId="explore-by-nationality"
          onClick={ exploreFoodsNationality }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testId="explore-surprise"
          onClick={ exploreFoodsSurprise }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
