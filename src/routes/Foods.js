import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { mealsEndpoints, RECIPES_LIMIT } from '../components/helpers/endpoints';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrincipalRecipeCard from '../components/PrincipalRecipeCard';
import Categories from '../components/Categories';

function Foods() {
  const { endpoint, setEndpoint } = useContext(RecipesContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEndpoint(mealsEndpoints.random);
  }, [setEndpoint]);

  useEffect(() => {
    const getData = async () => {
      if (endpoint !== '') {
        setLoading(true);
        try {
          const response = await fetch(endpoint);
          const results = await response.json();
          if (!results.meals) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else {
            setData(results.meals);
          }
          setLoading(false);
        } catch (error) {
          setData([]);
          setLoading(false);
        }
      }
    };
    getData();
  }, [endpoint]);

  if (data.length === 1) {
    const [recipe] = data;
    return <Redirect to={ `/foods/${recipe.idMeal}` } />;
  }

  return (
    <span>
      <Header title="Foods" searchIcon page="foods" />
      <Categories type="meals" />
      { loading && <p>Carregando...</p> }
      { !loading && data.length > 1 && (
        data.slice(0, RECIPES_LIMIT).map((recipe, index) => (
          <PrincipalRecipeCard
            key={ recipe.idMeal }
            type="Meal"
            recipe={ recipe }
            index={ index }
          />
        ))
      )}
      <Footer />
    </span>
  );
}

export default Foods;
