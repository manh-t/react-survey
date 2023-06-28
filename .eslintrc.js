module.exports = {
  extends: ['@nimblehq/eslint-config-nimble-react', '@nimblehq/eslint-config-nimble-testing'],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
};
