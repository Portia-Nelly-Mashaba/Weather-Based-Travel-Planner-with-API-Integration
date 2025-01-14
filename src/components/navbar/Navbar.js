import React from "react";
import logo from "../../assets/logo.png";

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
            <ion-icon name="newspaper-outline"></ion-icon>
            <span>Blogs</span>
          </li>
          <li>
            <ion-icon name="locate-outline"></ion-icon>
            <span>Map</span>
          </li>
          <li>
            <ion-icon name="camera-outline"></ion-icon>
            <span>Photos</span>
          </li>
          <li>
            <ion-icon name="videocam-outline"></ion-icon>
            <span>Videos</span>
          </li>
          <li>
            <ion-icon name="call-outline"></ion-icon>
            <span>Phone</span>
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