// src/components/header/Header.js
import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() !== '' && onSearch) {
      onSearch(searchText); // Trigger the search function passed via props
    }
  };

  return (
    <div className="header-section">
      <div>
        <ion-icon name="location-outline"></ion-icon>
        <span>Johannesburg, JHB</span>
      </div>
      <div>
        <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
        <input
          type="text"
          placeholder="Search here"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <ion-icon name="calendar-outline"></ion-icon>
        <ion-icon name="star-outline" onClick={handleSearch}></ion-icon>
      </div>
    </div>
  );
};

export default Header;
