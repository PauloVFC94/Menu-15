import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { drinksEndpoints, mealsEndpoints } from './helpers';

function HeaderSearch({ page }) {
  const INITIAL_FILTERS = {
    search: '',
    endpoint: '',
  };

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { setEndpoint } = useContext(RecipesContext);

  const changeFilters = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterResults = () => {
    const { search, endpoint } = filters;
    const verifiesSearchMeal = (
      search.length > 1
      && endpoint === mealsEndpoints.firstLetterEndpoint
    );
    const verifiesSearchDrink = (
      search.length > 1
      && endpoint === drinksEndpoints.firstLetterEndpoint
    );
    if (verifiesSearchMeal || verifiesSearchDrink) {
      global.alert('Your search must have only 1 (one) character');
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: '',
      }));
    } else if (search === '' || endpoint === '') {
      global.alert('Please enter your search and select one of the options');
    } else {
      setEndpoint(`${endpoint}${search}`);
    }
  };

  return (
    <form className="search-header">
      <input
        type="text"
        name="search"
        value={ filters.search }
        data-testid="search-input"
        placeholder="Search Recipe"
        onChange={ changeFilters }
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          id="ingredient-search-radio"
          type="radio"
          name="endpoint"
          value={
            page === 'foods'
              ? mealsEndpoints.ingredientEndpoint : drinksEndpoints.ingredientEndpoint
          }
          onChange={ changeFilters }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          id="name-search-radio"
          type="radio"
          name="endpoint"
          value={
            page === 'foods'
              ? mealsEndpoints.nameEndpoint : drinksEndpoints.nameEndpoint
          }
          onChange={ changeFilters }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          id="first-letter-search-radio"
          type="radio"
          name="endpoint"
          value={
            page === 'foods'
              ? mealsEndpoints.firstLetterEndpoint : drinksEndpoints.firstLetterEndpoint
          }
          onChange={ changeFilters }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ filterResults }
      >
        Search
      </button>
    </form>
  );
}

HeaderSearch.propTypes = {
  page: PropTypes.string.isRequired,
};

export default HeaderSearch;
