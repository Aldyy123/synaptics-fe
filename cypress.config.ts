import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.ts',
    setupNodeEvents(on, config) {},
    env: {
      TEST_USER_NAME: 'Test User',
      TEST_TOKEN: 'TokenUser'
    }
  },
}) 