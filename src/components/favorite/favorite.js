import React from "react";
import "./../favorite/favorite.css";

const Favorite = () => {
  const favoritePlaces = [
    { name: "London", weather: "Cloudy", date: "2025-01-15" },
    { name: "New York", weather: "Sunny", date: "2025-01-14" },
    { name: "Tokyo", weather: "Rainy", date: "2025-01-13" },
  ];

  return (
    <div className="favorite-container">
      <h2>My Favorite Places</h2>
      <table className="favorite-table">
        <thead>
          <tr>
            <th>Place Name</th>
            <th>Weather</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {favoritePlaces.map((place, index) => (
            <tr key={index}>
              <td>{place.name}</td>
              <td>{place.weather}</td>
              <td>{place.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorite;
