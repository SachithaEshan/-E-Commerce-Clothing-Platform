// jest.setup.js

// 1. Load environment variables from .env file using dotenv
import dotenv from "dotenv";
dotenv.config();

// 2. If you need to mock any global functions or objects, you can do that here
// For example, you can mock the global `fetch` function:
import { fetchMock } from "jest-fetch-mock";
global.fetch = fetchMock;

// 3. You can also add global setup for testing libraries
// If you're using jest-dom, you might need this to enable the extended assertions
import "@testing-library/jest-dom";

// 4. If you need to mock any other modules, you can do so here
// jest.mock('module-name', () => { /* mock implementation */ });

// You can add any setup logic that needs to be run before tests start here
