import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

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
      <div className="profile-header">
        <Header title="Profile" />
      </div>
      <section className="profile-user-data">
        <h4 data-testid="profile-email">{ user.email }</h4>
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
