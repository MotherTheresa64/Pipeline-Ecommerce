import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("App", () => {
  test("renders welcome/home message", () => {
    render(<App />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
