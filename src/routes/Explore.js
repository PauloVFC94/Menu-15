import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <>
      <div className="explore-header">
        <Header title="Explore" />
      </div>
      <div className="explore-btn">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => { history.push('/explore/drinks'); } }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
