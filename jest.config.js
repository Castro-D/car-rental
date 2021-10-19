module.exports = {
  verbose: true,
  rootDir: 'src',
  collectCoverage: true,
  coverageDirectory: '../coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};
