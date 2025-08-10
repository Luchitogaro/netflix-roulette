import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GenreSelect } from "../GenreSelect";

const mockGenres = ["ALL", "COMEDY", "HORROR"];
const mockOnSelect = jest.fn();

afterEach(() => {
  mockOnSelect.mockClear();
});

describe("GenreSelect", () => {
  it("renders all provided genres", () => {
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre="ALL"
        onSelect={mockOnSelect}
      />
    );

    mockGenres.forEach((g) =>
      expect(screen.getByRole("button", { name: g })).toBeInTheDocument()
    );
  });

  it("highlights the currently-selected genre", () => {
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre="COMEDY"
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByRole("button", { name: "COMEDY" })).toHaveClass(
      "active"
    );
    expect(screen.getByRole("button", { name: "ALL" })).not.toHaveClass(
      "active"
    );
  });

  it("calls onSelect with the clicked genre", () => {
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre="ALL"
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "HORROR" }));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("HORROR");
  });
});
