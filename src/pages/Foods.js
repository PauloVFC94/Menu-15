import React, { useContext, useEffect, useState } from 'react';
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
          setData(results.meals);
          setLoading(false);
        } catch (error) {
          setData([]);
          setLoading(false);
        }
      }
    };
    getData();
  }, [endpoint]);

  return (
    <span>
      <HeaderSearch page="foods" />
      { loading && <p>Carregando...</p> }
      { !loading && !data.length && <p>Select a category or search for a recipe</p>}
    </span>
  );
}

export default Foods;
