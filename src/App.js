import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Activities from "./components/activities/Activities";
import Map from "./components/map/Map";
import Favorite from "./components/favorite/favorite";


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/map" element={<Map />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
