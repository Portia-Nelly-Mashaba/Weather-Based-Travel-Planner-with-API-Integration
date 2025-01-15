import React, { useState } from 'react';
import './Dashboard.css';
import Header from '../header/Header'; // Import the Header component
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";
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
    <div>
      {/* Add Header at the top */}
      <Header />
      <div className="dashboard-section">
        <div className="home">
          <div className="feed-1">
            <div className="feeds">
              <img src={sunCloudy} alt="" />
              <div>
                <div>
                  <span>London, UK</span>
                  <span>Partly Cloud</span>
                </div>
                <div>
                  <span>
                    28 <sup>o</sup>
                  </span>
                </div>
              </div>
            </div>
            <div className="feed">
              <img src={Map} alt="Map Display" className="map-image" />
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
      </div>
    </div>
  );
};

export default Dashboard;
