import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  let user = { email: 'EUREKA.com.br@gmail.com' };
  const nameUser = JSON.parse(localStorage.getItem('user'));
  if (nameUser) {
    user = nameUser;
  }

  function clearStorage() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header title="Profile" />
      <section>
        <p data-testid="profile-email">{ user.email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearStorage }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
