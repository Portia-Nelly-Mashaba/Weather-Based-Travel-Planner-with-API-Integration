import React, { useState } from 'react';
import './Dashboard.css';
import Header from '../header/Header';
import sunCloudy from '../../assets/sun-cloudy.png';
import Rain from '../../assets/rain.png';
import PartlySunny from '../../assets/partly-sunny.png';
import SunWindy from '../../assets/sun-windy.png';
import Compass from '../../assets/compass.png';
import Drops from '../../assets/drops.png';
import Ultraviolet from '../../assets/ultraviolet.png';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [places, setPlaces] = useState([]); // State to store nearby places

  const handleSearch = async (location) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/weather?location=${location}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);

      // Fetch nearby outdoor activity locations
      const placesResponse = await fetch(`http://localhost:5000/map?location=${location}`);
      if (!placesResponse.ok) {
        throw new Error('Failed to fetch places data');
      }
      const placesData = await placesResponse.json();
      setPlaces(placesData.locationData); // Assuming `locationData` contains the list of places
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageByTemperature = (tempInWords) => {
    switch (tempInWords) {
      case 'Freezing':
      case 'Cold':
        return Rain;
      case 'Cool':
        return PartlySunny;
      case 'Warm':
      case 'Hot':
        return SunWindy;
      default:
        return sunCloudy;
    }
  };

  const getActivitiesByWeather = (tempInWords) => {
    switch (tempInWords) {
      case 'Freezing':
        return ['Shopping', 'Dining', 'Museum Visit', 'Cinema', 'Library'];
      case 'Cold':
        return ['Sightseeing', 'Relaxing', 'Indoor Fitness', 'Nightlife'];
      case 'Cool':
        return ['Sightseeing', 'Hiking', 'Yoga', 'Outdoor Café', 'Park Lounging'];
      case 'Warm':
        return ['Swimming', 'Picnic', 'City Tour', 'Kayaking', 'Garden Visit'];
      case 'Hot':
        return ['Beach Day', 'Pool Relaxation', 'Evening Sightseeing', 'Outdoor Barbecue'];
      default:
        return ['Relaxing at Home', 'Reading', 'Netflix'];
    }
  };

  const getGoogleMapLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="dashboard-section">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {weatherData ? (
          <div className="home">
            <div className="feed-1">
              <div className="feeds">
                <img src={sunCloudy} alt="" />
                <div>
                  <div>
                    <span>{weatherData.cityName}, ({weatherData.cityAbbreviation})</span>
                    <span>{weatherData.tempInWords}</span>
                  </div>
                  <div>
                    <span>
                      {weatherData.tempInCelsius} <sup>o</sup>
                    </span>
                  </div>
                </div>
              </div>
              <div className="feed">
                <img src={getImageByTemperature(weatherData.tempInWords)} alt="Weather Icon" />
              </div>
            </div>

            <div className="highlights">
              <h2>Today's Activities</h2>
              <div className="all-highlights">
                {getActivitiesByWeather(weatherData.tempInWords).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="places">
              <h2>Nearby Places for Outdoor Activities</h2>
              <div className="all-places">
                {places.length > 0 ? (
                  places.map((place, index) => (
                    <div key={index} className="place-item">
                      <span>{place.name}</span>
                      <a
                        href={getGoogleMapLink(place.lat, place.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Map
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No nearby places found.</p>
                )}
              </div>
            </div>

            <div className="cities">
              <h2>Weather Forecast</h2>
              <div className="all-cities">
                {weatherData.forecast && weatherData.forecast.length > 0 ? (
                  weatherData.forecast.map((day, index) => (
                    <div key={index}>
                      <div>
                        <img src={day.icon} alt="Weather Icon" />
                        <div>
                          <span>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}</span>
                          <span>
                            {day.weather}. Low: {day.low}°C | High: {day.high}°C
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No forecast available.</p>
                )}
                <button>
                  <span>See More</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No weather data available.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
