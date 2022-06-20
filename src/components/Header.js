import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <div>
        <Link to="/profile">
          <img
            src={ ProfileIcon }
            alt="Profile Icon"
          />
        </Link>
        <h2>Title</h2>
        <img
          src={ SearchIcon }
          alt="Search Icon"
        />
      </div>
      <input id="lul" type="text" hidden />
    </header>
  );
}

export default Header;
