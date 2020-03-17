module.exports = {
  displayName: "Shuri",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).js"],
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    "server/**/*.js",
    "!**/coverage/**",
    "!**/tests/**",
    "!**/migrations/**",
    "!**/seeders/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
    "!**/dist/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
