import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  it('renders input with initial value from props', () => {
    render(<SearchForm initialQuery="Avengers" onSearch={jest.fn()} />);
    expect(screen.getByDisplayValue('Avengers')).toBeInTheDocument();
  });

  it('calls onSearch with correct value after typing and clicking Submit', () => {
    const onSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/What do you want to watch?/i), {
      target: { value: 'Inception' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Inception');
  });

  it('calls onSearch with correct value after typing and pressing Enter on button', () => {
    const onSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/What do you want to watch?/i);
    fireEvent.change(input, { target: { value: 'Matrix' } });
    const button = screen.getByRole('button', { name: /search/i });
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Matrix');
  });
});
