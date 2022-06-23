import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getEndpointByPathname } from '../components/helpers';

function RecipeInProgress({ location: { pathname } }) {
  const type = pathname.includes('foods') ? 'Meal' : 'Drink';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const endpoint = getEndpointByPathname(pathname);
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        const results = await response.json();
        console.log(results);
        const [recipe] = results[`${type === 'Meal' ? 'meals' : 'drinks'}`];
        setData(recipe);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [pathname, type]);

  if (loading) return <p>Carregando...</p>;

  return (
    <span>
      <img
        src={ data[`str${type}Thumb`] }
        alt={ `${data[`str${type}`]} thumbnail` }
        width="200px"
        data-testid="recipe-photo"
      />
    </span>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeInProgress;
