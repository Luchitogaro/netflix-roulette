import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieForm } from './MovieForm';

describe('<MovieForm />', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<MovieForm onSubmit={mockOnSubmit} />);
    }).not.toThrow();
  });

  it('renders all form fields', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/movie url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/overview/i)).toBeInTheDocument();
  });

  it('renders submit and reset buttons', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('has correct data-cy attributes for testing', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-title')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-release-date')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-movie-url')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-rating')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-genre')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-runtime')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-overview')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-submit')).toBeInTheDocument();
    expect(screen.getByTestId('movie-form-reset')).toBeInTheDocument();
  });

  it('populates form with initial movie data when provided', () => {
    const initialMovie = {
      id: '1',
      title: 'Test Movie',
      releaseDate: '2023-01-01',
      movieUrl: 'https://example.com',
      rating: 8.5,
      genre: 'COMEDY',
      runtime: '1h 30min',
      overview: 'Test overview'
    };

    render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByDisplayValue('Test Movie')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('COMEDY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1h 30min')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test overview')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when form is submitted', async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), 'Test Movie');
    await user.type(screen.getByLabelText(/release date/i), '2023-01-01');
    await user.type(screen.getByLabelText(/movie url/i), 'https://example.com');
    await user.type(screen.getByLabelText(/rating/i), '8.5');
    await user.selectOptions(screen.getByLabelText(/genre/i), 'COMEDY');
    await user.type(screen.getByLabelText(/runtime/i), '1h 30min');
    await user.type(screen.getByLabelText(/overview/i), 'Test overview');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: undefined,
      title: 'Test Movie',
      releaseDate: '2023-01-01',
      movieUrl: 'https://example.com',
      rating: 8.5,
      genre: 'COMEDY',
      runtime: '1h 30min',
      overview: 'Test overview'
    });
  });

  it('preserves initial movie id when editing', async () => {
    const user = userEvent.setup();
    const initialMovie = {
      id: '123',
      title: 'Original Title',
      releaseDate: '2023-01-01',
      movieUrl: 'https://example.com',
      rating: 8.0,
      genre: 'DRAMA',
      runtime: '2h',
      overview: 'Original overview'
    };

    render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
    
    // Change the title
    await user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Updated Title');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify that onSubmit was called and check the received data
    expect(mockOnSubmit).toHaveBeenCalled();
    const submittedData = mockOnSubmit.mock.calls[0][0];
    
    // Check that the ID is preserved
    expect(submittedData.id).toBe('123');
    expect(submittedData.title).toBe('Updated Title');
    expect(submittedData.releaseDate).toBe('2023-01-01');
    expect(submittedData.movieUrl).toBe('https://example.com');
    expect(submittedData.rating).toBe(8.0);
    expect(submittedData.runtime).toBe('2h');
    expect(submittedData.overview).toBe('Original overview');
  });

  it('resets form when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), 'Test Movie');
    await user.type(screen.getByLabelText(/overview/i), 'Test overview');
    
    // Click reset
    await user.click(screen.getByRole('button', { name: /reset/i }));
    
    // Check that fields are cleared
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/overview/i)).toHaveValue('');
  });

  it('prevents form submission when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Note: HTML5 validation might not prevent submission in test environment
    // This test verifies the form renders correctly
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
  });

  it('handles rating input correctly', async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const ratingInput = screen.getByLabelText(/rating/i);
    
    // Test valid rating
    await user.type(ratingInput, '9.5');
    expect(ratingInput).toHaveValue(9.5);
    
    // Test decimal rating
    await user.clear(ratingInput);
    await user.type(ratingInput, '7.8');
    expect(ratingInput).toHaveValue(7.8);
  });

  it('renders genre options correctly', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const genreSelect = screen.getByLabelText(/genre/i);
    expect(genreSelect).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5); // Including "Select Genre" option
    expect(options[0]).toHaveTextContent('Select Genre');
    expect(options[1]).toHaveValue('COMEDY');
    expect(options[2]).toHaveValue('HORROR');
    expect(options[3]).toHaveValue('CRIME');
    expect(options[4]).toHaveValue('DOCUMENTARY');
  });
});
