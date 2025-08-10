import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "../SearchForm";

describe("SearchForm", () => {
  it("renders with the provided initial query", () => {
    render(<SearchForm initialQuery="Avengers" onSearch={jest.fn()} />);
    expect(screen.getByDisplayValue("Avengers")).toBeInTheDocument();
  });

  it("updates the input while typing", () => {
    render(<SearchForm initialQuery="" onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText(/what do you want/i);
    fireEvent.change(input, { target: { value: "Inception" } });
    expect(input).toHaveValue("Inception");
  });

  it("calls onSearch with the current value when button is clicked", () => {
    const onSearch = jest.fn();
    render(<SearchForm initialQuery="Avengers" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/what do you want/i);
    fireEvent.change(input, { target: { value: "Inception" } });

    fireEvent.click(screen.getByText("SEARCH"));
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("Inception");
  });

  it("calls onSearch with the current value when Enter is pressed", () => {
    const onSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/what do you want/i);
    fireEvent.change(input, { target: { value: "Matrix" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("Matrix");
  });

  it("trims the query before sending it", () => {
    const onSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/what do you want/i);
    fireEvent.change(input, { target: { value: "   Interstellar  " } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSearch).toHaveBeenCalledWith("Interstellar");
  });
});
