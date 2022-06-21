import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <div id="navLinks">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          onClick={ () => { history.push('/drinks'); } }
        >
          <img
            src={ drinkIcon }
            alt="drinks-icon"
          />
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ () => { history.push('/explore'); } }
        >
          <img
            src={ exploreIcon }
            alt="explore-icon"
          />
        </button>
        <button
          type="button"
          data-testid="food-bottom-btn"
          onClick={ () => { history.push('foods'); } }
        >
          <img
            src={ mealIcon }
            alt="food-icon"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
