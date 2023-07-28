import { getHighResolutionImage } from './image';

describe('image helper', () => {
  describe('getHighResolutionImage', () => {
    describe('given an image url', () => {
      it('returns the high resolution image url', () => {
        expect(getHighResolutionImage('http://imageurl.com/image_')).toBe('http://imageurl.com/image_l');
      });
    });

    describe('given an undefined', () => {
      it('returns the empty string', () => {
        expect(getHighResolutionImage(undefined)).toBe('');
      });
    });
  });
});
