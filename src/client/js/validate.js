import dayjs from 'dayjs';

// Validation function for the date
export const validateDate = (departureDate) => {
    const today = dayjs().startOf('day');  // Get the current date from the start of the day
    const selectedDate = dayjs(departureDate, 'YYYY-MM-DD').startOf('day');  // Departure date

    // Calculate the difference in days between the departure date and the current date
    const daysDifference = selectedDate.diff(today, 'day');

    // Check if the date exceeds 15 days
    if (daysDifference > 15) {
        return 'The date must be within the next 15 days.';
    }

    // Check if the date is in the past
    if (daysDifference < 0) {
        return 'The date cannot be in the past.';
    }

    // If there are no errors, return null
    return null;
};