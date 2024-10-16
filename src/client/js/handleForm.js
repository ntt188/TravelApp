import dayjs from "dayjs";
import { validateDate } from './validate';

const handleForm = async (e) => {
    e.preventDefault();

   // Retrieve data from the form
   const location = document.getElementById('location').value;
   const departureDate = document.getElementById('date').value;

   const card = document.querySelector('.card');
   const today = dayjs().startOf('day');

   // Validate the input data using the validateDate function
   const error = validateDate(departureDate);

   // If there's an error, display the error and stop processing
   if (error) {
    card.style.display = 'none';
    document.getElementById('location-image').src = ''; // Clear the image if there's an error
    alert(error);
    return;
}

   // Calculate the number of days remaining before the trip
   const daysDifference = calculateDaysDifference(today, departureDate);   
   
   card.style.display = 'grid';

   // Display the remaining days and the location
   document.getElementById('countdown-location').innerText = `Your trip to ${location} is in ${daysDifference} day(s).`;

   try {
       // Call the API to get coordinates from Geonames
       const coordinates = await getCoordinates(location);

       let weatherData;
       let weatherText = '';

       // If the trip is within 7 days, get the current weather
       if (daysDifference <= 7) {
           weatherData = await getWeather(coordinates.lat, coordinates.lng, today.format('YYYY-MM-DD'));
           weatherText = `Temperature: ${weatherData.temp}°C. Weather is expected to be ${weatherData.weather.description}.`;
       } 
       // If the trip is more than 7 days away, get the forecast for the selected date
       else {
           weatherData = await getWeather(coordinates.lat, coordinates.lng, dayjs(departureDate).format('YYYY-MM-DD'));
           weatherText = `Forecast for your trip: Max Temp: ${weatherData.max_temp}°C, Min Temp: ${weatherData.min_temp}°C. Weather is ${weatherData.weather.description}.`;
       }

       // Display the weather data
       document.getElementById('weather-data').innerText = weatherText;

       // Call the Pixabay API to get an image of the location
       const imageData = await getImage(location);

       // Display the image from Pixabay
       document.getElementById('location-image').src = imageData.imageUrl;
   } catch (error) {
       console.error('Error fetching data:', error);
   }
}

// Get coordinates from Geonames
const getCoordinates = async (location) => {
    try {
        const response = await fetch('http://localhost:8081/getCoordinates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location })
        });
        
        // Check the response before converting to JSON
        if (!response.ok) {
            throw new Error('Error fetching coordinates: ' + response.statusText);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

// Get weather data from Weatherbit
const getWeather = async (lat, lng, date) => {
    try {
        const response = await fetch('http://localhost:8081/getWeather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lng, date })
        });
        
        // Check the response before converting to JSON
        if (!response.ok) {
            throw new Error('Error fetching weather data: ' + response.statusText);
        }

        const textResponse = await response.text(); // Fetch raw text data

        if (textResponse) {
            const data = JSON.parse(textResponse); // Convert to JSON if there's content
            return data;
        } else {
            throw new Error('Empty response from weather API.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// Get image from Pixabay
const getImage = async (location) => {
    try {
        const response = await fetch('http://localhost:8081/getImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location })
        });
        
        // Check the response before converting to JSON
        if (!response.ok) {
            throw new Error('Error fetching image data: ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching image data:', error);
        throw error;
    }
};

// Calculate the number of days remaining before the trip
const calculateDaysDifference = (today, departureDate) => {
    const selectedDate = dayjs(departureDate, 'YYYY-MM-DD').startOf('day');
    const daysDifference = selectedDate.diff(today, 'day');
    return daysDifference;
};

export { handleForm }