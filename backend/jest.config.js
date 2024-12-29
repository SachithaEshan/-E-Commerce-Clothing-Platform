export default {
  testMatch: ["**/tests/**/*.test.js", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel to transform JavaScript files
  },
};
