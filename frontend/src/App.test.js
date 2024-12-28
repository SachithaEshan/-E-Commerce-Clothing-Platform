import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome")).toBeTruthy(); // Adjust based on your App component
  });
});
