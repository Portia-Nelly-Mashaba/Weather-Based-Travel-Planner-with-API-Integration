import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';


const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const favoritesRef = ref(db, 'favorites');
      onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();
        const userFavorites = [];
        
        for (let id in data) {
          if (data[id].username === user.email) {
            userFavorites.push(data[id]);
          }
        }

        setFavorites(userFavorites);
      });
    }
  }, [auth]);

  return (
    <div className="favorite-container">
      <h2>Your Favorite Places</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              <h3>{favorite.place}</h3>
              <p>{favorite.date}</p>
              <a href={favorite.mapLink} target="_blank" rel="noopener noreferrer">View on Map</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorite;