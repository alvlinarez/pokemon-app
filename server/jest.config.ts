// jest.config.ts (ESM-friendly config for ts-jest)
import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  // Helps when your source sometimes appends `.js` in imports; maps back to TS during tests
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Optional: global setup if you need env vars
  // setupFiles: ['<rootDir>/tests/setup-env.ts'],
  // Run tests serially to avoid port conflicts when using supertest on the same app instance
  maxWorkers: 1,
};

export default config;
