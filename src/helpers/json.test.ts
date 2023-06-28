/* eslint camelcase: ["error", {allow: ["snake_case", "kebab_case", "camel_case", "pascal_case", "html_event_json"]}] */
import { JSONValue, keysToCamelCase, keysToSnakeCase } from './json';

describe('JSON helper', () => {
  describe('keysToCamelCase', () => {
    describe('given a JSON Object', () => {
      it('returns the JSON Object with camel case keys', () => {
        const jsonObject = {
          snake_case: 'snake_case',
          'kebab-case': 'kebab-case',
          camelCase: 'camelCase',
          PascalCase: 'PascalCase',
          normalcase: 'normalcase',
          HTMLEventJSON: 'HTMLEventJSON',
          SCREAMINGCASE: 'SCREAMINGCASE',
        };

        expect(keysToCamelCase(jsonObject)).toEqual({
          snakeCase: 'snake_case',
          kebabCase: 'kebab-case',
          camelCase: 'camelCase',
          pascalCase: 'PascalCase',
          normalcase: 'normalcase',
          htmlEventJson: 'HTMLEventJSON',
          screamingcase: 'SCREAMINGCASE',
        });
      });
    });

    describe('given a JSON Array', () => {
      it('returns the JSON Array that has JSON Object with camel case keys', () => {
        const jsonArray: JSONValue = [
          {
            snake_case: 'snake_case',
          },
          {
            'kebab-case': 'kebab-case',
          },
          {
            camelCase: 'camelCase',
          },
          {
            PascalCase: 'PascalCase',
          },
          {
            normalcase: 'normalcase',
          },
          {
            HTMLEventJSON: 'HTMLEventJSON',
          },
          {
            SCREAMINGCASE: 'SCREAMINGCASE',
          },
        ];

        expect(keysToCamelCase(jsonArray)).toEqual([
          {
            snakeCase: 'snake_case',
          },
          {
            kebabCase: 'kebab-case',
          },
          {
            camelCase: 'camelCase',
          },
          {
            pascalCase: 'PascalCase',
          },
          {
            normalcase: 'normalcase',
          },
          {
            htmlEventJson: 'HTMLEventJSON',
          },
          {
            screamingcase: 'SCREAMINGCASE',
          },
        ]);
      });
    });

    describe('given a non JSON Object or Array', () => {
      it('returns the given values', () => {
        expect(keysToCamelCase('string')).toBe('string');
        expect(keysToCamelCase(123)).toBe(123);
        expect(keysToCamelCase(true)).toBe(true);
      });
    });
  });

  describe('keysToSnakeCase', () => {
    describe('given a JSON Object', () => {
      it('returns the JSON Object with camel case keys', () => {
        const jsonObject = {
          snake_case: 'snake_case',
          'kebab-case': 'kebab-case',
          camelCase: 'camelCase',
          PascalCase: 'PascalCase',
          normalcase: 'normalcase',
          HTMLEventJSON: 'HTMLEventJSON',
          SCREAMINGCASE: 'SCREAMINGCASE',
        };

        expect(keysToSnakeCase(jsonObject)).toEqual({
          snake_case: 'snake_case',
          kebab_case: 'kebab-case',
          camel_case: 'camelCase',
          pascal_case: 'PascalCase',
          normalcase: 'normalcase',
          html_event_json: 'HTMLEventJSON',
          screamingcase: 'SCREAMINGCASE',
        });
      });
    });

    describe('given a JSON Array', () => {
      it('returns the JSON Array that has JSON Object with camel case keys', () => {
        const jsonArray: JSONValue = [
          {
            snake_case: 'snake_case',
          },
          {
            'kebab-case': 'kebab-case',
          },
          {
            camelCase: 'camelCase',
          },
          {
            PascalCase: 'PascalCase',
          },
          {
            normalcase: 'normalcase',
          },
          {
            HTMLEventJSON: 'HTMLEventJSON',
          },
          {
            SCREAMINGCASE: 'SCREAMINGCASE',
          },
        ];

        expect(keysToSnakeCase(jsonArray)).toEqual([
          {
            snake_case: 'snake_case',
          },
          {
            kebab_case: 'kebab-case',
          },
          {
            camel_case: 'camelCase',
          },
          {
            pascal_case: 'PascalCase',
          },
          {
            normalcase: 'normalcase',
          },
          {
            html_event_json: 'HTMLEventJSON',
          },
          {
            screamingcase: 'SCREAMINGCASE',
          },
        ]);
      });
    });

    describe('given a non JSON Object or Array', () => {
      it('returns the given values', () => {
        expect(keysToSnakeCase('string')).toBe('string');
        expect(keysToSnakeCase(123)).toBe(123);
        expect(keysToSnakeCase(true)).toBe(true);
      });
    });
  });
});
