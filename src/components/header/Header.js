import React, { useState } from 'react';
import './Header.css';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() !== '' && onSearch) {
      onSearch(searchText); // Trigger the search function passed via props
    }
  };

  // Function to handle adding a favorite
  const handleFavorite = () => {
    const user = auth.currentUser;
    
    if (user) {
      const username = user.email;
      const favoriteData = {
        place: searchText,
        mapLink: 'https://maps.google.com/?q=' + searchText, // Assuming the place name is used in the URL
        date: new Date().toLocaleDateString(),
        username: username
      };

      // Add to Firebase Database
      const favoriteRef = ref(db, 'favorites');
      const newFavoriteRef = push(favoriteRef);
      set(newFavoriteRef, favoriteData);

      alert('Favorite added!');
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="header-section">
      <div>
        <ion-icon name="location-outline"></ion-icon>
        <span>{searchText || 'Enter location'}</span>
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
        <ion-icon name="star-outline" onClick={handleFavorite}></ion-icon>
      </div>
    </div>
  );
};

export default Header;