import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import logo from '../images/logo.png';

function Login() {
  const { handleLogin,
    loginButton,
    loginButtonSubmit,
    loginComplete } = useContext(RecipesContext);
  return (
    <form className="form-login">
      <img src={ logo } alt="logo" />
      <input
        name="loginEmail"
        type="email"
        data-testid="email-input"
        onChange={ handleLogin }
        placeholder="E-mail"
      />
      <input
        name="loginPassword"
        type="password"
        data-testid="password-input"
        onChange={ handleLogin }
        placeholder="Senha"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        className="login-btn"
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
