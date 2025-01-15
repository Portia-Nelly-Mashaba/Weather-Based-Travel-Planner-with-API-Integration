const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());



// Weather API endpoint
// app.get('/weather', async (req, res) => {
//   // Hardcoded coordinates for Johannesburg
//   const lat = -26.2041;
//   const lon = 28.0473;

//   try {
//     const weatherApiKey = process.env.WEATHER_API_KEY;
//     if (!weatherApiKey) {
//       return res.status(500).send('Weather API Key not found in environment variables');
//     }

//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

//     const response = await axios.get(weatherUrl);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Error fetching weather data');
//   }
// });
// In the backend, modify the /weather route to send the needed information:

// Updated /weather route
// Weather endpoint
app.get('/weather', async (req, res) => {
  const location = req.query.location || 'Johannesburg'; // Default location
  const weatherApiKey = process.env.WEATHER_API_KEY;

  if (!weatherApiKey) {
    return res.status(500).send('Weather API Key not found in environment variables');
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(weatherUrl);

    const cityName = response.data.name;
    const tempInCelsius = response.data.main.temp;
    const tempInWords = getTemperatureInWords(tempInCelsius);

    res.json({
      cityName,
      cityAbbreviation: cityName.substring(0, 3).toUpperCase(),
      tempInWords,
      tempInCelsius,
      lat: response.data.coord.lat, // Latitude
      lon: response.data.coord.lon, // Longitude
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching weather data');
  }
});

// Helper function to convert temperature into descriptive words
const getTemperatureInWords = (temp) => {
  if (temp < 0) return "Freezing";
  if (temp < 10) return "Cold";
  if (temp < 20) return "Cool";
  if (temp < 30) return "Warm";
  return "Hot";
};

// Helper function to suggest activities
const getActivities = (temp) => {
  if (temp < 0) {
    return [
      { activity: "Skiing", location: "Snow Resort", mapUrl: "https://www.google.com/maps?q=snow+resort" },
      { activity: "Ice Skating", location: "Ice Arena", mapUrl: "https://www.google.com/maps?q=ice+arena" },
    ];
  } else if (temp < 10) {
    return [
      { activity: "Hot Chocolate Tasting", location: "Cafe Central", mapUrl: "https://www.google.com/maps?q=cafe+central" },
      { activity: "Indoor Movie Marathon", location: "Cinema Park", mapUrl: "https://www.google.com/maps?q=cinema+park" },
    ];
  } else if (temp < 20) {
    return [
      { activity: "Hiking", location: "Green Hill", mapUrl: "https://www.google.com/maps?q=green+hill" },
      { activity: "Cycling", location: "City Park", mapUrl: "https://www.google.com/maps?q=city+park" },
    ];
  } else if (temp < 30) {
    return [
      { activity: "Swimming", location: "Beach Paradise", mapUrl: "https://www.google.com/maps?q=beach+paradise" },
      { activity: "Outdoor Yoga", location: "Sunset Gardens", mapUrl: "https://www.google.com/maps?q=sunset+gardens" },
    ];
  } else {
    return [
      { activity: "Water Park Visit", location: "Splash World", mapUrl: "https://www.google.com/maps?q=splash+world" },
      { activity: "Beach Volleyball", location: "Sunny Beach", mapUrl: "https://www.google.com/maps?q=sunny+beach" },
    ];
  }
};



// Map API endpoint (Google Maps)
app.get('/map', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).send('Location query parameter is required');
  }

  try {
    const mapApiKey = process.env.GOOGLE_MAP_API_KEY;
    if (!mapApiKey) {
      return res.status(500).send('Google Maps API Key not found in environment variables');
    }

    // Google Maps API URL to get geocode data for the given location
    const mapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${mapApiKey}`;

    const response = await axios.get(mapUrl);

    // Log the response to see what is returned
    console.log('Google Maps API Response:', response.data);

    // Get the first result from the Google Maps geocoding API
    if (response.data.results.length > 0) {
      const locationData = response.data.results[0].geometry.location;

      // Create a Google Maps URL with a marker at the location
      const googleMapUrl = `https://www.google.com/maps?q=${locationData.lat},${locationData.lng}&z=12`;

      res.json({
        mapUrl: googleMapUrl,
        locationData
      });
    } else {
      res.status(404).send('Location not found');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching map data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
