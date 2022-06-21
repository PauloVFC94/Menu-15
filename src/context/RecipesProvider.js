import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [loginComplete, setLoginComplete] = useState(false);

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
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginEmail }));
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
