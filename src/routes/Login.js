import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const { handleLogin,
    loginButton,
    loginButtonSubmit,
    loginComplete } = useContext(RecipesContext);
  return (
    <form id="form-login">
      <input
        name="loginEmail"
        type="email"
        data-testid="email-input"
        onChange={ handleLogin }
      />
      <input
        name="loginPassword"
        type="password"
        data-testid="password-input"
        onChange={ handleLogin }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        id="login-btn"
        disabled={ loginButton }
        onClick={ loginButtonSubmit }
      >
        Enter
      </button>
      {loginComplete === true && <Redirect to="/foods" />}
    </form>
  );
}

export default Login;
