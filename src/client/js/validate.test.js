import { validateDate } from './validate';
import dayjs from 'dayjs';

describe('validateDateWithin16Days', () => {
    it('should return error if date is in the past', () => {
        const pastDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD'); // Date in the past
        const result = validateDate(pastDate);
        expect(result).toBe('The date cannot be in the past.');
    });

    it('should return error if date is more than 15 days in the future', () => {
        const futureDate = dayjs().add(16, 'day').format('YYYY-MM-DD'); // Date greater than 15 days
        const result = validateDate(futureDate);
        expect(result).toBe('The date must be within the next 15 days.');
    });

    it('should return null if date is within the next 15 days', () => {
        const validDate = dayjs().add(10, 'day').format('YYYY-MM-DD'); // Valid date
        const result = validateDate(validDate);
        expect(result).toBeNull();
    });

    it('should return null if date is today', () => {
        const today = dayjs().format('YYYY-MM-DD'); // Current date
        const result = validateDate(today);
        expect(result).toBeNull();
    });
});
