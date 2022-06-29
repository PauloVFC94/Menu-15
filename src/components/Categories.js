import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksEndpoints, mealsEndpoints } from './helpers/endpoints';

const CATEGORIES_INDEX_LIMIT = 5;

function Categories({ type }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const endpoint = `${type === 'meals'
      ? mealsEndpoints.categories : drinksEndpoints.categories}`;
    const getCategories = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const results = data[type]
          .slice(0, CATEGORIES_INDEX_LIMIT)
          .map((category) => {
            const [str] = Object.values(category);
            return str;
          });
        setCategories(['All', ...results]);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [type]);

  return (
    <span>
      { categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
        >
          { category }
        </button>
      )) }
    </span>
  );
}

Categories.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Categories;
