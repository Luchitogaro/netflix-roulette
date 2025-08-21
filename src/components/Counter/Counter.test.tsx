import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Counter } from "../Counter";

describe("Counter (class component)", () => {
  it("renders the initial value", () => {
    render(<Counter initialValue={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("defaults to 0 when no initialValue is provided", () => {
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("increments the value when + is clicked", () => {
    render(<Counter initialValue={3} />);
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("decrements the value when - is clicked", () => {
    render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
