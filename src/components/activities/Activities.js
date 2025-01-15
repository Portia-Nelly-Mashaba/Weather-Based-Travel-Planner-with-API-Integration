import React from "react";
import "./Activities.css";
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

const Activities = () => {
  const activities = [
    { img: Compass, title: "Hiking", location: "Pretoria", temp: "28°", weather: "Sunny" },
    { img: sunCloudy, title: "Swimming", location: "Hatfield", temp: "22°", weather: "Cloudy" },
    { img: Rain, title: "Quad-Biking", location: "Menlyn", temp: "18°", weather: "Rainy" },
    { img: SunWindy, title: "Kite Surfing", location: "Sunnyside", temp: "25°", weather: "Windy" },
    { img: Drops, title: "Camping", location: "Centurion", temp: "20°", weather: "Clear" },
    { img: Ultraviolet, title: "Running", location: "Silver Lakes", temp: "24°", weather: "Partly Cloudy" },
    { img: PartlySunny, title: "Cycling", location: "Brooklyn", temp: "21°", weather: "Overcast" },
  ];

  return (
    <div className="activities-container">
      <h2>Today's Activities</h2>
      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div className="activity-card" key={index}>
            <div className="activity-image">
              <img src={activity.img} alt={activity.title} />
            </div>
            <div className="activity-details">
              <span className="activity-title">{activity.title}</span>
              <span className="activity-location">{activity.location}</span>
              <span className="activity-weather">{activity.weather}</span>
              <span className="activity-temp">{activity.temp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
