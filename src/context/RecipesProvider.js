import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [hidden, setHidden] = useState(true);
  const [endpoint, setEndpoint] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [loginComplete, setLoginComplete] = useState(false);
  const history = useHistory();
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);

  function GetByFilter(url, typeFood, func, number) {
    const apiGetFood = async () => {
      try {
        const response = await fetch(url);
        const dataApi = await response.json();
        const filterFirst12 = dataApi[typeFood]
          .filter((food, index) => index < number);
        if (filterFirst12.length !== 0) {
          func([...filterFirst12]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    apiGetFood();
  }

  const validateLogin = () => {
    const minPassword = 6;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(loginEmail) && loginPassword.length >= minPassword) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }
  };

  const handleLogin = ({ target }) => {
    if (target.name === 'loginEmail') {
      validateLogin();
      setLoginEmail(target.value);
    } else {
      validateLogin();
      setLoginPassword(target.value);
    }
  };

  const loginButtonSubmit = (event) => {
    event.preventDefault();
    const inProgress = {
      cocktails: {
      },
      meals: {
      },
    };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginEmail }));
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    setLoginComplete(true);
  };

  const contextValue = {
    loginEmail,
    loginPassword,
    loginButton,
    loginComplete,
    setLoginEmail,
    setLoginPassword,
    handleLogin,
    validateLogin,
    loginButtonSubmit,
    endpoint,
    setEndpoint,
    hidden,
    setHidden,
    history,
    mealsIngredients,
    setMealsIngredients,
    drinksIngredients,
    setDrinksIngredients,
    GetByFilter,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
