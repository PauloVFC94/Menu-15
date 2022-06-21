import React, { useState } from 'react';
import { firstLetterEndpoint, ingredientEndpoint, nameEndpoint } from './helpers';

function HeaderSearch() {
  const INITIAL_FILTERS = {
    search: '',
    endpoint: '',
  };

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const changeFilters = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <span className="search-header">
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
          value={ ingredientEndpoint }
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
          value={ nameEndpoint }
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
          value={ firstLetterEndpoint }
          onChange={ changeFilters }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </span>
  );
}

export default HeaderSearch;
