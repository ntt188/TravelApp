const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to handle CORS and parse request body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist')); // Middleware to handle CORS and parse request body

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

const getCoordinates = async (req, res) => {
    const location = req.body.city;
    const geonamesUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
    try {
        const response = await axios.get(geonamesUrl);
        const { lat, lng } = response.data.geonames[0];
        res.send({ lat, lng });
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).send({ error: 'Error fetching coordinates' });
    }
};

const getWeather = async (req, res) => {
    const { lat, lng, date } = req.body;
    const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`;
    try {
        const response = await axios.get(weatherbitUrl);
        const weatherData = response.data.data.find(item => item.datetime === date);
        res.send(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send({ error: 'Error fetching weather data' });
    }
};

const getImage = async (req, res) => {
    const location = req.body.city;
    const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${location}&image_type=photo`;
    try {
        const response = await axios.get(pixabayUrl);
        const imageUrl = response.data.hits[0]?.webformatURL || '';
        res.send({ imageUrl });
    } catch (error) {
        console.error('Error fetching image data:', error);
        res.status(500).send({ error: 'Error fetching image data' });
    }
};

// Routes that use the handler functions
app.post('/getCoordinates', getCoordinates);
app.post('/getWeather', getWeather);
app.post('/getImage', getImage);

// Start the server on the port specified in the environment variable or default to 8081
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = { app, getCoordinates, getWeather, getImage }; // Export the app object and handler functions for testing