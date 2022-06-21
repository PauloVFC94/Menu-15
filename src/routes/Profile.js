import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const emailDoUsuario = 'ALELUIA';
  console.log(emailDoUsuario);

  const handleClick = () => {
    console.log('ALELUIA');
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <section>
        <p data-testid="profile-email">{emailDoUsuario}</p>
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
          onClick={ handleClick }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
