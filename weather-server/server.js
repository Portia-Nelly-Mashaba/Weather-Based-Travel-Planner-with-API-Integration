const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// In-memory user storage (for demonstration purposes only)
const users = [];

// Weather API endpoint
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

    const mapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${mapApiKey}`;
    const response = await axios.get(mapUrl);

    if (response.data.results.length > 0) {
      const locationData = response.data.results[0].geometry.location;

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

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  res.json({ message: 'Login successful', email: user.email });
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already in use
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the in-memory storage
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
