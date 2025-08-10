import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';   // gives the .toBeInTheDocument() matcher
import App from './App';

describe('App', () => {
  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/SEARCH/i);
    expect(linkElement).toBeInTheDocument();
  });
});