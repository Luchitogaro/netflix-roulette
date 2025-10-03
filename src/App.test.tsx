import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

global.fetch = jest.fn();

describe('App', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/SEARCH/i);
    expect(linkElement).toBeInTheDocument();
  });
});
