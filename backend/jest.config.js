export default {
  testMatch: ["**/tests/**/*.test.js", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  preset: "@shelf/jest-mongodb",
};
