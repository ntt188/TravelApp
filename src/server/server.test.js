const { getCoordinates, getWeather } = require('./server');
const axios = require('axios');

// Mock Axios
jest.mock('axios');

describe('Test Express server handlers', () => {
    let req, res;

    // Set up mock for req and res before each test
    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),  // Mock send
            json: jest.fn(),  // Mock json if you use json()
        };
    });

    // Test for getCoordinates function
    it('should return coordinates for a valid location', async () => {
        req.body = { city: 'Paris' };

        // Mock the response from Geonames API
        axios.get.mockResolvedValue({
            data: {
                geonames: [{ lat: 48.8566, lng: 2.3522 }],
            },
        });

        await getCoordinates(req, res);    // Test the getCoordinates function

        expect(res.send).toHaveBeenCalledWith({ lat: 48.8566, lng: 2.3522 });
    });

    // Test for getWeather function
    it('should return weather for valid coordinates', async () => {
        req.body = { lat: 48.8566, lng: 2.3522, date: '2024-10-15' };

        // Mock the response from Weatherbit API
        axios.get.mockResolvedValue({
            data: {
                data: [{ datetime: '2024-10-15', temp: 18, weather: { description: 'Sunny' } }],
            },
        });

        await getWeather(req, res);  /// Test the getWeather function

        // Check that send was called with an object containing the necessary properties
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            temp: 18,
            weather: { description: 'Sunny' }
        }));
    });
});
