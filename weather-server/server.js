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

app.get('/weather', async (req, res) => {
  const location = req.query.location || 'Johannesburg'; // Default to Johannesburg if no location is provided
  const weatherApiKey = process.env.WEATHER_API_KEY;

  if (!weatherApiKey) {
    return res.status(500).send('Weather API Key not found in environment variables');
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(weatherUrl);

    const cityName = response.data.name;
    const tempInWords = getTemperatureInWords(response.data.main.temp); // Function to convert temp to words

    res.json({
      cityName,
      cityAbbreviation: cityName.substring(0, 3).toUpperCase(), // Abbreviation from first 3 letters
      tempInWords,
      tempInCelsius: response.data.main.temp,
      mapUrl: `https://www.google.com/maps?q=${response.data.coord.lat},${response.data.coord.lon}&z=12`
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching weather data');
  }
});

// Helper function to convert temperature to words
const getTemperatureInWords = (temp) => {
  if (temp < 0) return "Freezing";
  if (temp < 10) return "Cold";
  if (temp < 20) return "Cool";
  if (temp < 30) return "Warm";
  return "Hot";
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
