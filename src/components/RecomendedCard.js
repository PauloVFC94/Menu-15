import React from 'react';
import PropTypes from 'prop-types';

function RecomendedCard(props) {
  const { imagem, nome, index, categoria } = props;
  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      className="card card-body"
      id="card"
    >
      <img className="rounded-circle img-thumbnail" src={ imagem } alt={ nome } />
      <p>{categoria}</p>
      <p data-testid={ `${index}-recomendation-title` }>{nome}</p>
    </div>
  );
}

RecomendedCard.propTypes = {
  imagem: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  categoria: PropTypes.string.isRequired,
};

export default RecomendedCard;
