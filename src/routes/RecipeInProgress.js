import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getEndpointByPathname, getIngredients, getMeasures } from '../components/helpers';
import shareBtn from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import styles from '../styles/RecipeInProgress.module.css';

function RecipeInProgress({ location: { pathname } }) {
  const type = pathname.includes('foods') ? 'Meal' : 'Drink';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checks, setChecks] = useState(0);
  const [isDisabled, setIsDisabled] = useState({
    numberOfIngredients: 0,
    bool: true,
  });

  useEffect(() => {
    const getData = async () => {
      const endpoint = getEndpointByPathname(pathname);
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        const results = await response.json();
        const [recipe] = results[`${type === 'Meal' ? 'meals' : 'drinks'}`];
        setData(recipe);
        setIsDisabled((prevIsDisabled) => ({
          ...prevIsDisabled,
          numberOfIngredients: getIngredients(recipe).length,
          bool: true,
        }));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, [pathname, type]);

  useEffect(() => {
    setIsDisabled((prevIsDisabled) => ({
      ...prevIsDisabled,
      bool: prevIsDisabled.numberOfIngredients !== checks,
    }));
  }, [checks]);

  const handleCheck = ({ target: { checked } }) => {
    setChecks((prevChecks) => (checked ? prevChecks + 1 : prevChecks - 1));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <span>
      <span className={ styles.header }>
        <img
          src={ data[`str${type}Thumb`] }
          alt={ `${data[`str${type}`]} thumbnail` }
          width="200px"
          data-testid="recipe-photo"
          className={ styles.recipePhoto }
        />
        <h1 data-testid="recipe-title">{ data[`str${type}`] }</h1>
        <p
          data-testid="recipe-category"
        >
          { data[`${type === 'Meal' ? 'strCategory' : 'strAlcoholic'}`] }
        </p>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img
            src={ shareBtn }
            alt="share button"
          />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img
            src={ whiteHeartIcon }
            alt="not favorited button"
          />
        </button>
      </span>
      <h3>Ingredients</h3>
      <span className={ styles.ingredientsBox }>
        { getIngredients(data).map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ ingredient }
              type="checkbox"
              onChange={ handleCheck }
            />
            {`${ingredient} ${
              getMeasures(data)[index] ? `- ${getMeasures(data)[index]}` : ''
            }`}
          </label>
        )) }
      </span>
      <h3>Instructions</h3>
      <p
        data-testid="instructions"
        className={ styles.instructions }
      >
        { data.strInstructions }
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className={ styles.fixedBtn }
        disabled={ isDisabled.bool }
      >
        Finish recipe
      </button>
    </span>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeInProgress;
