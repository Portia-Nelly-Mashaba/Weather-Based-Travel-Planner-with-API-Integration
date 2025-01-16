import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../header/Header';
import sunCloudy from '../../assets/sun-cloudy.png';
import Rain from '../../assets/rain.png';
import PartlySunny from '../../assets/partly-sunny.png';
import SunWindy from '../../assets/sun-windy.png';
import emoji from 'emoji-dictionary';

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
      console.log('Weather data:', data); // Log weather data
      setWeatherData(data);

      // Fetch nearby outdoor activity locations
      fetchPlaces(data.lat, data.lon);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async (lat, lon) => {
    try {
      const types = ['shopping_mall', 'library', 'museum', 'hotel'];
      const promises = types.map(type =>
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=${type}&key=YOUR_GOOGLE_API_KEY`)
          .then(response => response.json())
      );
      const results = await Promise.all(promises);
      const placesData = results.flatMap(result => result.results.map(place => ({
        name: place.name,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      })));
      console.log('Places data:', placesData); // Log places data
      setPlaces(placesData);
    } catch (error) {
      console.error('Error fetching places data:', error);
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
    const activities = {
      Freezing: [
        `Shopping ${emoji.getUnicode('shopping_bags')}`,
        `Dining ${emoji.getUnicode('fork_and_knife')}`,
        `Museum Visit ${emoji.getUnicode('classical_building')}`,
        `Cinema ${emoji.getUnicode('clapper')}`,
        `Library ${emoji.getUnicode('books')}`,
      ],
      Cold: [
        `Sightseeing ${emoji.getUnicode('camera')}`,
        `Relaxing ${emoji.getUnicode('relaxed')}`,
        `Indoor Fitness ${emoji.getUnicode('muscle')}`,
        `Nightlife ${emoji.getUnicode('night_with_stars')}`,
      ],
      Cool: [
        `Sightseeing ${emoji.getUnicode('camera')}`,
        `Hiking ${emoji.getUnicode('boot')}`,
        `Yoga ${emoji.getUnicode('woman_in_lotus_position')}`,
        `Outdoor Café ${emoji.getUnicode('coffee')}`,
        `Park Lounging ${emoji.getUnicode('deciduous_tree')}`,
      ],
      Warm: [
        `Swimming ${emoji.getUnicode('swimmer')}`,
        `Picnic ${emoji.getUnicode('basket')}`,
        `City Tour ${emoji.getUnicode('building_construction')}`,
        `Kayaking ${emoji.getUnicode('canoe')}`,
        `Garden Visit ${emoji.getUnicode('seedling')}`,
      ],
      Hot: [
        `Beach Day ${emoji.getUnicode('beach_with_umbrella')}`,
        `Pool Relaxation ${emoji.getUnicode('umbrella_on_ground')}`,
        `Evening Sightseeing ${emoji.getUnicode('city_sunset')}`,
        `Outdoor Barbecue ${emoji.getUnicode('meat_on_bone')}`,
      ],
    };
    return activities[tempInWords] || [];
  };

  const getGoogleMapLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  // Function to fetch weather data for 4 days
  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&units=metric&appid=YOUR_API_KEY`);
      const data = await response.json();
      console.log('Forecast data:', data); // Log forecast data
      const forecast = data.list.map((item) => ({
        date: new Date(item.dt * 1000).toISOString(),
        low: item.main.temp_min,
        high: item.main.temp_max,
        weather: item.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }));
      setWeatherData((prevData) => ({ ...prevData, forecast }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    // Initial fetch for a default location
    handleSearch('Johannesburg');
  }, []);

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