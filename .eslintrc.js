module.exports = {
  extends: [
    '@nimblehq/eslint-config-nimble-react',
    '@nimblehq/eslint-config-nimble-testing',
    'plugin:cypress/recommended',
    'prettier',
  ],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
};
