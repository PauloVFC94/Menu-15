import React, { useContext, useEffect, useState } from 'react';
import HeaderSearch from '../components/HeaderSearch';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const INITIAL_DATA = {
    noResults: 'Choose a category or search for a recipe',
  };

  const { endpoint } = useContext(RecipesContext);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (endpoint !== '') {
        setLoading(true);
        try {
          const response = await fetch(endpoint);
          const results = await response.json();
          setData(results.meals);
          setLoading(false);
        } catch (error) {
          setData({
            noResults: 'Algo deu errado, tente fazer outra busca',
          });
          setLoading(false);
        }
      }
    };
    getData();
  }, [endpoint]);

  return (
    <span>
      <HeaderSearch />
      { loading && <p>Carregando...</p> }
      { !loading && data.noResults && <p>{ data.noResults }</p> }
    </span>
  );
}

export default Foods;
