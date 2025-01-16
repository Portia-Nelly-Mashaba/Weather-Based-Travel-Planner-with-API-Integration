import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-section">
      <nav>
        <img src={logo} alt="Logo" />
        <ul>
          <li>
            <ion-icon name="home-outline"></ion-icon>
            <NavLink to="/" activeClassName="active-link" exact>
              Home
            </NavLink>
          </li>
          <li>
            <ion-icon name="star-outline"></ion-icon>
            <NavLink to="/favorite" activeClassName="active-link">
              Favorite
            </NavLink>
          </li>
          <li>
            <ion-icon name="star-outline"></ion-icon>
            <NavLink to="/profile" activeClassName="active-link">
              Profile
            </NavLink>
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
