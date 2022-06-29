import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksEndpoints, mealsEndpoints } from './helpers/endpoints';
import RecipesContext from '../context/RecipesContext';
import '../styles/Categories.css';

const CATEGORIES_INDEX_LIMIT = 5;

function Categories({ type }) {
  const [categories, setCategories] = useState([]);
  const { setEndpoint } = useContext(RecipesContext);

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

  const changeEndpointByCategory = (category, event) => {
    const { target: { className } } = event;
    if (category === 'All' || className === 'clicked') {
      const endpoint = `${type === 'meals'
        ? mealsEndpoints.random : drinksEndpoints.random}`;
      setEndpoint(endpoint);
      event.target.className = '';
    } else {
      const endpoint = `${type === 'meals'
        ? mealsEndpoints.searchByCategory : drinksEndpoints.searchByCategory}`;
      setEndpoint(`${endpoint}${category}`);
      const HTMLallButtons = document.getElementsByClassName('clicked');
      const allButtons = [...HTMLallButtons];
      allButtons.forEach((element) => {
        element.className = '';
      });
      event.target.className = 'clicked';
    }
  };

  return (
    <span>
      { categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
          onClick={ (event) => changeEndpointByCategory(category, event) }
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
