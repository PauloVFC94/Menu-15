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
      <div className="d-flex justify-content-around">
        <button
          type="button"
          onClick={ () => { history.push('/drinks'); } }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinks-icon"
          />
        </button>
        <button
          type="button"
          onClick={ () => { history.push('/explore'); } }
        >
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="explore-icon"
          />
        </button>
        <button
          type="button"
          onClick={ () => { history.push('foods'); } }
        >
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="food-icon"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
