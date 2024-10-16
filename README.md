# Travel App

## Description

**Travel App** is an application that allows users to input a location and departure date to receive weather forecasts and related images for that location. The app uses the following APIs to gather information:

- **GeoNames API**: To get coordinates (lat, lng) based on the city name.
- **Weatherbit API**: To receive current and future weather forecasts based on the coordinates.
- **Pixabay API**: To display images related to the location.

## Main Features

1. Input location and departure date.
2. If the trip is within a week, receive the current weather forecast.
3. If the trip is more than a week away, receive the weather forecast for the specific date.
4. Display images related to the location.

## Installation and Running the Application

### Requirements

- Node.js (>= v14.0.0)
- npm (>= 6.0.0)

### Installation Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ntt188/TravelApp.git
    cd TravelApp
    ```

2. **Install necessary packages:**

    ```bash
    npm i
    ```

3. **Configure the `.env` file:**

    Create a `.env` file in the root directory of the project and add the following environment variables:
    ```bash
    GEONAMES_USERNAME=your_geonames_username
    WEATHERBIT_API_KEY=your_weatherbit_api_key
    PIXABAY_API_KEY=your_pixabay_api_key
    ```
    Replace `your_geonames_username`, `your_weatherbit_api_key`, and `your_pixabay_api_key` with your own API key values.

4. **Run the application in development mode:**

    Run the following command to start the server in development mode:
    ```bash
    npm run build-dev
    ```
    The server will run at `http://localhost:8081`.

5. **Build the application for production:**

    To build the application for production:
    ```bash
    npm run build-prod
    ```

6. **Run the application with Nodemon (auto-restart on changes):**
    ```bash
    npm start
    ```

## Testing

    The project includes **unit tests** with **Jest**. To run the tests, you can use the following command:
    ```bash
    npm run test
    ```

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Framework for building the server.
- **Axios**: HTTP client library for making API requests.
- **Webpack**: A tool for bundling source code.
- **Sass**: CSS with advanced features.
- **Jest**: A testing framework.

## API Resources

1. **GeoNames API**: https://www.geonames.org/
2. **Weatherbit API**: https://www.weatherbit.io/
3. **Pixabay API**: https://pixabay.com/api/docs/

## Author

Nguyen Thanh Thang