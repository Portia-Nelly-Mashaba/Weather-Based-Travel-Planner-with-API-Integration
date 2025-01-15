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

  const handleSearch = async (location) => {
    try {
      const response = await fetch(`http://localhost:5000/weather?location=${location}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getImageByTemperature = (tempInWords) => {
    switch (tempInWords) {
      case 'Freezing':
        return Rain;
      case 'Cold':
        return Rain;
      case 'Cool':
        return PartlySunny;
      case 'Warm':
        return sunCloudy;
      case 'Hot':
        return SunWindy;
      default:
        return sunCloudy;
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="dashboard-section">
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
                <div>
                  <div>
                    <img src={Compass} alt="Compass" />
                    <div>
                      <span>Hiking</span>
                      <span>Pretoria</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={sunCloudy} alt="Cloudy" />
                    <div>
                      <span>Swimming</span>
                      <span>Hatfield</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Rain} alt="Rain" />
                    <div>
                      <span>Quad-Biking</span>
                      <span>Menlyn</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Drops} alt="Drops" />
                    <div>
                      <span>Swimming</span>
                      <span>Menlyn</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Ultraviolet} alt="Ultraviolet" />
                    <div>
                      <span>Hiking</span>
                      <span>Pretoria</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={PartlySunny} alt="Partly Sunny" />
                    <div>
                      <span>Knitting</span>
                      <span>Sunnyside</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cities">
              <h2>Other Activities</h2>
              <div className="all-cities">
                <div>
                  <div>
                    <img src={sunCloudy} alt="Cloudy Weather" />
                    <div>
                      <span>Monday date</span>
                      <span>
                        Cloudy. Low: 18° <br /> Hiking <br /> Swimming
                      </span>
                    </div>
                  </div>
                  <div>
                    <span>7 <sup>o</sup></span>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Rain} alt="Rainy Weather" />
                    <div>
                      <span>Tuesday</span>
                      <span>
                        Rain. Low: 12° <br /> Hiking <br /> Swimming
                      </span>
                    </div>
                  </div>
                  <div>
                    <span>19 <sup>o</sup></span>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Rain} alt="Snow Weather" />
                    <div>
                      <span>Wednesday</span>
                      <span>
                        Snow. Low: 8° <br /> Hiking <br /> Swimming
                      </span>
                    </div>
                  </div>
                  <div>
                    <span>22 <sup>o</sup></span>
                  </div>
                </div>
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
