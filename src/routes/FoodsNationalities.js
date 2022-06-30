import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const NUMBER_TWELVE = 12;

function FoodsNationalities() {
  const [state, setState] = useState('All');
  const [listNations, setListNations] = useState([]);
  const [mealsByNation, setMealsByNation] = useState([]);
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    setState(value);
  };

  useEffect(() => {
    const searchNatinalities = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const { meals } = await response.json();
        const natinalities = meals.map((nationality) => nationality.strArea);
        setListNations(['All', ...natinalities]);
      } catch (e) {
        console.log(e);
      }
    };
    searchNatinalities();
  }, []);

  useEffect(() => {
    const foodNatinality = async () => {
      if (state === 'All') {
        try {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          const { meals } = await response.json();
          const mealsNationality = meals.filter((meal, index) => index < NUMBER_TWELVE);
          setMealsByNation([...mealsNationality]);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${state}`);
          const { meals } = await response.json();
          const mealsNationality = meals.filter((meal, index) => index < NUMBER_TWELVE);
          setMealsByNation([...mealsNationality]);
        } catch (e) {
          console.log(e);
        }
      }
    };
    foodNatinality();
  }, [state]);

  const acao = async (foodId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    // console.log(meals[0].idMeal);
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <>
      <Header title="Explore Nationalities" searchIcon />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChange }
      >
        {
          listNations.map((nation) => (
            <option
              key={ nation }
              data-testid={ `${nation}-option` }
            >
              {nation}
            </option>
          ))
        }
      </select>
      {
        mealsByNation.map((food, index) => (
          <IngredientCard
            key={ food.idMeal }
            name={ food.strMeal }
            imageSrc={ food.strMealThumb }
            testId={ `${index}-recipe-card` }
            testImageId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
            action={ () => { acao(food.idMeal); } }
          />
        ))
      }
      <Footer />
    </>
  );
}

export default FoodsNationalities;
