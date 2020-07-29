module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/tests/**/*.test.ts?(x)"],
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json'
      }
    }
  };