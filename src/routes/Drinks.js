import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RECIPES_LIMIT } from '../components/helpers/endpoints';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { endpoint } = useContext(RecipesContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (endpoint !== '') {
        setLoading(true);
        try {
          const response = await fetch(endpoint);
          const results = await response.json();
          if (!results.drinks) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else {
            setData(results.drinks);
          }
          setLoading(false);
        } catch (error) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          setData([]);
          setLoading(false);
        }
      }
    };
    getData();
  }, [endpoint]);

  if (data.length === 1) {
    const [recipe] = data;
    return <Redirect to={ `/drinks/${recipe.idDrink}` } />;
  }

  return (
    <span>
      <Header title="Drinks" searchIcon page="drinks" />
      { loading && <p>Carregando...</p> }
      { !loading && data.length > 1 && (
        data.slice(0, RECIPES_LIMIT).map((recipe, index) => (
          <RecipeCard
            key={ recipe.idDrink }
            type="Drink"
            recipe={ recipe }
            index={ index }
          />
        ))
      )}
    </span>
  );
}

export default Drinks;
