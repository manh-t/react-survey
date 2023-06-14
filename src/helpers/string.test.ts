import { camelize } from './string';

describe('String helper', () => {
  describe('camelize', () => {
    it('returns camelized string', () => {
      expect(camelize('SCREAMING_SNAKE_CASE')).toBe('screamingSnakeCase');
      expect(camelize('snake_case')).toBe('snakeCase');
      expect(camelize('normal case')).toBe('normalCase');
      expect(camelize('PascalCase')).toBe('pascalcase');
    });
  });
});
