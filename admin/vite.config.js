import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.js"], // Ensure this path is correct and the setup file exists
    include: ["**/*.test.{js,jsx}"], // Add support for .jsx test files
    transformMode: {
      web: [/.[tj]sx?$/], // Handle both .js and .jsx files
    },
  },
});
