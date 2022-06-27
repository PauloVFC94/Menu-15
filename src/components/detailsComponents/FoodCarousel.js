import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCarousel(props) {
  const { i1, i2, i3, i4, i5, i6 } = props;
  let count = 0;

  const leftFunction = (event) => {
    const image1 = document.getElementById('rec1');
    const image2 = document.getElementById('rec2');
    const image3 = document.getElementById('rec3');
    const image4 = document.getElementById('rec4');
    const image5 = document.getElementById('rec5');
    const image6 = document.getElementById('rec6');
    const leftButton = document.getElementById('button-left');
    const rightButton = document.getElementById('button-right');
    event.preventDefault();
    if (count === 1) {
      image1.hidden = false;
      image2.hidden = false;
      image3.hidden = true;
      image4.hidden = true;
      leftButton.disabled = true;
      count -= 1;
    } else if (count === 2) {
      image3.hidden = false;
      image4.hidden = false;
      image5.hidden = true;
      image6.hidden = true;
      rightButton.disabled = false;
      count -= 1;
    }
  };

  const rightFunction = (event) => {
    const image1 = document.getElementById('rec1');
    const image2 = document.getElementById('rec2');
    const image3 = document.getElementById('rec3');
    const image4 = document.getElementById('rec4');
    const image5 = document.getElementById('rec5');
    const image6 = document.getElementById('rec6');
    const leftButton = document.getElementById('button-left');
    const rightButton = document.getElementById('button-right');
    event.preventDefault();
    if (count === 0) {
      image1.hidden = true;
      image2.hidden = true;
      image3.hidden = false;
      image4.hidden = false;
      leftButton.disabled = false;
      count += 1;
    } else if (count === 1) {
      image3.hidden = true;
      image4.hidden = true;
      image5.hidden = false;
      image6.hidden = false;
      rightButton.disabled = true;
      count += 1;
    }
  };

  return (
    <div className="carousel-int-div">
      <button
        type="button"
        id="button-left"
        onClick={ (event) => leftFunction(event) }
      >
        ←
      </button>
      <Link to={ `/drinks/${i1.idDrink}` }>
        <div className="card-carousel" id="rec1" data-testid="0-recomendation-card">
          <img src={ i1.strDrinkThumb } alt="i1" id="image1" />
          <p>{ i1.strAlcoholic }</p>
          <h3 data-testid="0-recomendation-title">{ i1.strDrink }</h3>
        </div>
      </Link>
      <Link to={ `/drinks/${i2.idDrink}` }>
        <div className="card-carousel" id="rec2" data-testid="1-recomendation-card">
          <img src={ i2.strDrinkThumb } alt="i2" id="image2" />
          <p>{ i2.strAlcoholic }</p>
          <h3 data-testid="1-recomendation-title">{ i2.strDrink }</h3>
        </div>
      </Link>
      <Link to={ `/drinks/${i3.idDrink}` }>
        <div
          className="card-carousel"
          id="rec3"
          data-testid="2-recomendation-card"
          hidden
        >
          <img src={ i3.strDrinkThumb } alt="i3" id="image3" />
          <p>{ i3.strAlcoholic }</p>
          <h3 data-testid="2-recomendation-title">{ i3.strDrink }</h3>
        </div>
      </Link>
      <Link to={ `/drinks/${i4.idDrink}` }>
        <div
          className="card-carousel"
          id="rec4"
          data-testid="3-recomendation-card"
          hidden
        >
          <img src={ i4.strDrinkThumb } alt="i4" id="image4" />
          <p>{ i4.strAlcoholic }</p>
          <h3 data-testid="3-recomendation-title">{ i4.strDrink }</h3>
        </div>
      </Link>
      <Link to={ `/drinks/${i5.idDrink}` }>
        <div
          className="card-carousel"
          id="rec5"
          data-testid="4-recomendation-card"
          hidden
        >
          <img src={ i5.strDrinkThumb } alt="i5" id="image5" />
          <p>{ i5.strAlcoholic }</p>
          <h3 data-testid="4-recomendation-title">{ i5.strDrink }</h3>
        </div>
      </Link>
      <Link to={ `/drinks/${i5.idDrink}` }>
        <div
          className="card-carousel"
          id="rec6"
          data-testid="5-recomendation-card"
          hidden
        >
          <img src={ i6.strDrinkThumb } alt="i6" id="image6" />
          <p>{ i6.strAlcoholic }</p>
          <h3 data-testid="5-recomendation-title">{ i6.strDrink }</h3>
        </div>
      </Link>
      <button
        type="button"
        id="button-right"
        onClick={ (event) => rightFunction(event) }
      >
        →
      </button>
    </div>
  );
}

FoodCarousel.propTypes = {
  i1: PropTypes.string.isRequired,
  i2: PropTypes.string.isRequired,
  i3: PropTypes.string.isRequired,
  i4: PropTypes.string.isRequired,
  i5: PropTypes.string.isRequired,
  i6: PropTypes.string.isRequired,
};

export default FoodCarousel;
