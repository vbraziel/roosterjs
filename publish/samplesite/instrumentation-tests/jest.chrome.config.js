module.exports = {
  globalSetup: './config/setup.chrome.js',
  globalTeardown: './config/teardown.js',
  testEnvironment: './config/puppeteer_environment.js',
  testMatch: [
    "**/__instrumentation-tests__/**/*.test.ts?(x)",
  ],
  transform: {
    'ts(x)?$': 'ts-jest',
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  globals: {
    'ts-jest': {
      tsConfig: './publish/samplesite/instrumentation-tests/tsconfig.json'
    }
  }
};