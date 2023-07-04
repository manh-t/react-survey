import { getDaysAgoFromISODate, getdddMMMDDDateFromISODate } from './datetime';

// Mock the current date to a fixed date so the test is always correct regardless of the system date.
jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('Datetime helper', () => {
  describe('getdddMMMDDDateFromISODate', () => {
    describe('given an ISO date string', () => {
      it('returns the date with format ddd, MMM DD', () => {
        expect(getdddMMMDDDateFromISODate('2017-01-23T07:48:12.991Z')).toBe('Mon, Jan 23');
      });
    });

    describe('given an undefined', () => {
      it('returns the empty', () => {
        expect(getdddMMMDDDateFromISODate(undefined)).toBe('');
      });
    });
  });

  describe('getDaysAgoFromISODate', () => {
    describe('given an ISO date string', () => {
      it('returns the corresponding days from now', () => {
        expect(getDaysAgoFromISODate('2017-01-23T07:48:12.991Z')).toBe('3 years ago');
      });
    });

    describe('given an undefined', () => {
      it('returns the empty', () => {
        expect(getDaysAgoFromISODate(undefined)).toBe('');
      });
    });
  });
});
