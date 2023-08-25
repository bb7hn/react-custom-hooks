module.exports = {
	roots: ['./'], // Your source code directory
	testMatch: ['**/__tests__/**/*.test.ts'], // Test files pattern
	transform: {
	  '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
	},
	moduleNameMapper: {
	  '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS and LESS imports
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testEnvironment: 'jsdom', // Use the jsdom environment
  };
  