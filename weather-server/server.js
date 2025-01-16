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
app.get('/weather', async (req, res) => {
  const location = req.query.location || 'Johannesburg';
  const weatherApiKey = process.env.WEATHER_API_KEY;

  if (!weatherApiKey) {
    return res.status(500).send('Weather API Key not found in environment variables');
  }

  try {
    // Fetch coordinates for the location
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApiKey}`;
    const geoResponse = await axios.get(geoUrl);
    const { lat, lon } = geoResponse.data[0];

    // Fetch 7-day weather data using One Call API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherApiKey}`;
    const response = await axios.get(weatherUrl);

    const forecast = response.data.daily.map((day) => ({
      date: new Date(day.dt * 1000).toISOString(),
      low: day.temp.min,
      high: day.temp.max,
      weather: day.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    }));

    res.json({
      cityName: location,
      cityAbbreviation: location.substring(0, 3).toUpperCase(),
      tempInWords: 'N/A', // Optional for dashboard
      tempInCelsius: 'N/A', // Optional for dashboard
      forecast,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching weather data');
  }
});

// Helper function for descriptive temperature
const getTemperatureInWords = (temp) => {
  if (temp < 0) return 'Freezing';
  if (temp < 10) return 'Cold';
  if (temp < 20) return 'Cool';
  if (temp < 30) return 'Warm';
  return 'Hot';
};

// Activities API
app.get('/activities', (req, res) => {
  const temp = parseFloat(req.query.temperature);

  if (isNaN(temp)) {
    return res.status(400).send('Invalid temperature value');
  }

  const activities = getActivities(temp);
  res.json(activities);
});

// Helper function for activities
const getActivities = (temp) => {
  const tempInWords = getTemperatureInWords(temp);
  let activities = [];

  switch (tempInWords) {
    case 'Freezing':
      activities = ['Skiing', 'Ice Skating', 'Snowboarding'];
      break;
    case 'Cold':
      activities = ['Ice Fishing', 'Hiking', 'Snow Tubing'];
      break;
    case 'Cool':
      activities = ['Cycling', 'Jogging', 'Hiking'];
      break;
    case 'Warm':
      activities = ['Swimming', 'Kayaking', 'Running'];
      break;
    case 'Hot':
      activities = ['Sunbathing', 'Surfing', 'Fishing'];
      break;
    default:
      activities = ['Relaxing', 'Reading', 'Netflix'];
  }

  return activities;
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








