import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Enables DOM testing
    setupFiles: "./test/setup.js", // Optional: Path to setup file for test initialization
  },
});
