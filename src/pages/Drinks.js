import React, { useContext, useEffect, useState } from 'react';
import HeaderSearch from '../components/HeaderSearch';
import RecipesContext from '../context/RecipesContext';

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
          console.log(results.drinks);
          setData(results.drinks);
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
      <HeaderSearch page="drinks" />
      { loading && <p>Carregando...</p> }
      { !loading && !data.length && <p>Select a category or search for a recipe</p>}
    </span>
  );
}

export default Drinks;
