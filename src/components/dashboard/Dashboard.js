import React, { useState } from 'react';
import './Dashboard.css';
import Map from "../../assets/google_map.png";

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (location.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:5000/weather?location=${location}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  return (
    <div className="dashboard-section">
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search for a city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Weather Information */}
            {weatherData && (
              <div className="weather-info">
                <div>
                  <span>{weatherData.cityName}, {weatherData.cityAbbreviation}</span>
                  <span>{weatherData.tempInWords}</span>
                </div>
                <div>
                  <span>{weatherData.tempInCelsius} <sup>o</sup>C</span>
                </div>
                <div>
                  <a href={weatherData.mapUrl} target="_blank" rel="noopener noreferrer">
                    <img src={Map} alt="Google Map" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Today's Activities Section */}
        {weatherData && weatherData.activities && (
          <div className="highlights">
            <h2>Today's Activities</h2>
            <div className="all-highlights">
              {weatherData.activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <div>
                    <span>{activity.activity}</span>
                    <span>
                      <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer">
                        {activity.location}
                      </a>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
