module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
  };
  