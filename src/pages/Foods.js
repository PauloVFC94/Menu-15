import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../components/HeaderSearch';
import RecipesContext from '../context/RecipesContext';

function Foods() {
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
          console.log(results.meals);
          if (!results.meals) {
            global.alert('Sorry, we haven\'t found any recipes for these filters');
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
      <HeaderSearch page="foods" />
      { loading && <p>Carregando...</p> }
      { !loading && !data.length && <p>Select a category or search for a recipe</p>}
    </span>
  );
}

export default Foods;
