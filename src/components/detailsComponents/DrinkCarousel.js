import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCarousel(props) {
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
        className="button-left"
        onClick={ (event) => leftFunction(event) }
      >
        ←
      </button>
      <Link to={ `/foods/${i1.idMeal}` }>
        <div id="rec1" className="card-carousel" data-testid="0-recomendation-card">
          <img src={ i1.strMealThumb } alt="i1" id="image1" />
          <p>{ i1.strCategory }</p>
          <h3 data-testid="0-recomendation-title">{ i1.strMeal }</h3>
        </div>
      </Link>
      <Link to={ `/foods/${i2.idMeal}` }>
        <div id="rec2" className="card-carousel" data-testid="1-recomendation-card">
          <img src={ i2.strMealThumb } alt="i2" id="image2" />
          <p>{ i2.strCategory }</p>
          <h3 data-testid="1-recomendation-title">{ i2.strMeal }</h3>
        </div>
      </Link>
      <Link to={ `/foods/${i3.idMeal}` }>
        <div
          id="rec3"
          className="card-carousel"
          data-testid="2-recomendation-card"
          hidden
        >
          <img src={ i3.strMealThumb } alt="i3" id="image3" />
          <p>{ i3.strCategory }</p>
          <h3 data-testid="2-recomendation-title">{ i3.strMeal }</h3>
        </div>
      </Link>
      <Link to={ `/foods/${i4.idMeal}` }>
        <div
          id="rec4"
          className="card-carousel"
          data-testid="3-recomendation-card"
          hidden
        >
          <img src={ i4.strMealThumb } alt="i4" id="image4" />
          <p>{ i4.strCategory }</p>
          <h3 data-testid="3-recomendation-title">{ i4.strMeal }</h3>
        </div>
      </Link>
      <Link to={ `/foods/${i5.idMeal}` }>
        <div
          id="rec5"
          className="card-carousel"
          data-testid="4-recomendation-card"
          hidden
        >
          <img src={ i5.strMealThumb } alt="i5" id="image5" />
          <p>{ i5.strCategory }</p>
          <h3 data-testid="4-recomendation-title">{ i5.strMeal }</h3>
        </div>
      </Link>
      <Link to={ `/foods/${i6.idMeal}` }>
        <div
          id="rec6"
          className="card-carousel"
          data-testid="5-recomendation-card"
          hidden
        >
          <img src={ i6.strMealThumb } alt="i6" id="image6" />
          <p>{ i6.strCategory }</p>
          <h3 data-testid="5-recomendation-title">{ i6.strMeal }</h3>
        </div>
      </Link>
      <button
        type="button"
        className="button-right"
        onClick={ (event) => rightFunction(event) }
      >
        →
      </button>
    </div>
  );
}

DrinkCarousel.propTypes = {
  i1: PropTypes.string.isRequired,
  i2: PropTypes.string.isRequired,
  i3: PropTypes.string.isRequired,
  i4: PropTypes.string.isRequired,
  i5: PropTypes.string.isRequired,
  i6: PropTypes.string.isRequired,
};

export default DrinkCarousel;
