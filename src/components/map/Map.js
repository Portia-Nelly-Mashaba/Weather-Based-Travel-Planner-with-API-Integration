import React from "react";
import mapImage from "../../assets/google_map.png";
import "./Map.css";

const Map = () => {
  return (
    <div className="map-container">
      <h2>Map Page</h2>
      <div className="map-wrapper">
        <img src={mapImage} alt="Map" className="map-image" />
      </div>
    </div>
  );
};

export default Map;

