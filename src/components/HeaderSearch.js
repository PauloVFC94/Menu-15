import React from 'react';

function HeaderSearch() {
  return (
    <span className="search-header">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search Recipe"
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          id="ingredient-search-radio"
          type="radio"
          name="filterSearch"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          id="name-search-radio"
          type="radio"
          name="filterSearch"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          id="first-letter-search-radio"
          type="radio"
          name="filterSearch"
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
