import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import HeaderSearch from './HeaderSearch';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ title, searchIcon, page }) {
  const { hidden, setHidden } = useContext(RecipesContext);

  const renderSearchIcon = () => (
    <button type="button" onClick={ () => setHidden(!hidden) }>
      <img data-testid="search-top-btn" src={ SearchIcon } alt="Search Icon" />
    </button>
  );

  return (
    <header>
      <div>
        <Link to="/profile">
          <button type="button">
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="Profile Icon" />
          </button>
        </Link>

        <h2 data-testid="page-title">{title}</h2>

        { searchIcon ? renderSearchIcon()
          : <span hidden>oi</span> }
      </div>

      { hidden ? <span hidden>oi</span>
        : <HeaderSearch page={ page } /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchIcon: PropTypes.string,
}.isRequired;

export default Header;
