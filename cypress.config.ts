import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.test.{js,jsx,ts,tsx,feature}",
  },
});
