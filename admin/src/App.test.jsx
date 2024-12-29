import { describe, it, expect, test } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("demo", () => {
  expect(true).toBe(true);
});

describe("render", () => {
  it("renders the main page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
