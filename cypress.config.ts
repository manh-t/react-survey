/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */
import browserify from '@cypress/browserify-preprocessor';
import { defineConfig } from 'cypress';

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      on(
        'file:preprocessor',
        browserify({
          typescript: require.resolve('typescript'),
        })
      );

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
