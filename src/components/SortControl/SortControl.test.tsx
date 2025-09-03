import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortControl } from '../SortControl';

describe('SortControl', () => {
  it('renders label and select', () => {
    render(<SortControl value="releaseDate" onChange={() => {}} />);
    expect(screen.getByTestId('sort-label')).toHaveTextContent('SORT BY');
    expect(screen.getByTestId('sort-select')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = jest.fn();
    render(<SortControl value="releaseDate" onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('sort-select'), {
      target: { value: 'title' },
    });
    expect(handleChange).toHaveBeenCalledWith('title');
  });
});
