module.exports = {
  preset: 'ts-jest',            // use ts-jest to transform .ts/.tsx
  testEnvironment: 'jsdom',     // simulate the browser
  roots: ['<rootDir>/src'],     // where your source/tests live
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    /* if you use absolute imports with baseUrl/src */
    '^@/(.*)$': '<rootDir>/src/$1',
    /* if you import .css/.module.css */
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};