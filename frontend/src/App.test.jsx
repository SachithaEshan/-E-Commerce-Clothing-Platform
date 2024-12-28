import { describe, it, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import App from "./App";

test("demo", () => {
  expect(true).toBe(true);
});

describe("render", () => {
  it("renders the main page", () => {
    render(
      <BrowserRouter>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
