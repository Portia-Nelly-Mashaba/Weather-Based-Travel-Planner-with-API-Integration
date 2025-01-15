import React from "react";
import logo from "../../assets/logo.png";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-section">
      <nav>
        <img src={logo} alt="" />
        <ul>
          <li>
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
          </li>
          <li>
            <ion-icon name="bicycle-outline"></ion-icon>
            <span>Activities</span>
          </li>
          <li>
            <ion-icon name="locate-outline"></ion-icon>
            <span>Map</span>
          </li>
          <li>
            <ion-icon name="star-outline"></ion-icon>
            <span>Favorite</span>
          </li>
          
        </ul>
        <ul>
          <li>
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
