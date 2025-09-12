import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { MovieForm } from './MovieForm';
import { Dialog } from '../Dialog';
import './MovieForm.stories.css';

const meta: Meta<typeof MovieForm> = {
  title: 'Components/MovieForm',
  component: MovieForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="stories-container">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieForm>;

export const AddMovie: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submittedMovie, setSubmittedMovie] = useState<any>(null);
    const portalRootRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'dialog-root';
      document.body.appendChild(portalRoot);
      portalRootRef.current = portalRoot;
      
      return () => {
        if (portalRootRef.current) {
          portalRootRef.current.remove();
        }
      };
    }, []);
    
    const handleSubmit = (movie: any) => {
      setSubmittedMovie(movie);
      setIsOpen(false);
    };
    
    const handleClose = () => {
      setIsOpen(false);
    };
    
    return (
      <div>
        <h1 className="stories-title">
          Add Movie Use Case
        </h1>
        <p className="stories-description">
          Click the button below to open a dialog with an empty movie form
        </p>
        
        <div className="stories-button-container">
          <button
            onClick={() => setIsOpen(true)}
            className="stories-button"
          >
            ADD MOVIE
          </button>
        </div>
        
        {isOpen && portalRootRef.current && (
          <Dialog title="ADD MOVIE" onClose={handleClose} portalRoot={portalRootRef.current}>
            <MovieForm onSubmit={handleSubmit} />
          </Dialog>
        )}
        
        {submittedMovie && (
          <div className="stories-result">
            <h3 className="stories-result-title">Movie Added Successfully:</h3>
            <pre className="stories-result-content">
              {JSON.stringify(submittedMovie, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};

export const EditMovie: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submittedMovie, setSubmittedMovie] = useState<any>(null);
    const portalRootRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'dialog-root';
      document.body.appendChild(portalRoot);
      portalRootRef.current = portalRoot;
      
      return () => {
        if (portalRootRef.current) {
          portalRootRef.current.remove();
        }
      };
    }, []);
    
    const initialMovie = {
      id: '1',
      title: 'Pulp Fiction',
      releaseDate: '1994-10-14',
      movieUrl: 'https://example.com/pulp-fiction',
      rating: 8.9,
      genre: 'CRIME',
      runtime: '2h 34min',
      overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    };
    
    const handleSubmit = (movie: any) => {
      setSubmittedMovie(movie);
      setIsOpen(false);
    };
    
    const handleClose = () => {
      setIsOpen(false);
    };
    
    return (
      <div>
        <h1 className="stories-title">
          Edit Movie Use Case
        </h1>
        <p className="stories-description">
          Click the button below to open a dialog with a prefilled movie form
        </p>
        
        <div className="stories-button-container">
          <button
            onClick={() => setIsOpen(true)}
            className="stories-button"
          >
            EDIT MOVIE
          </button>
        </div>
        
        {isOpen && portalRootRef.current && (
          <Dialog title="EDIT MOVIE" onClose={handleClose} portalRoot={portalRootRef.current}>
            <MovieForm 
              initialMovie={initialMovie} 
              onSubmit={handleSubmit} 
            />
          </Dialog>
        )}
        
        {submittedMovie && (
          <div className="stories-result">
            <h3 className="stories-result-title">Movie Updated Successfully:</h3>
            <pre className="stories-result-content">
              {JSON.stringify(submittedMovie, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};

export const DeleteMovie: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const portalRootRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'dialog-root';
      document.body.appendChild(portalRoot);
      portalRootRef.current = portalRoot;
      
      return () => {
        if (portalRootRef.current) {
          portalRootRef.current.remove();
        }
      };
    }, []);
    
    const movieToDelete = {
      id: '1',
      title: 'Pulp Fiction',
      genre: 'CRIME',
      year: '1994'
    };
    
    const handleDelete = () => {
      setIsDeleted(true);
      setIsOpen(false);
    };
    
    const handleClose = () => {
      setIsOpen(false);
    };
    
    return (
      <div>
        <h1 className="stories-title">
          Delete Movie Use Case
        </h1>
        <p className="stories-description">
          Click the button below to open a delete confirmation dialog
        </p>
        
        <div className="stories-button-container">
          <button
            onClick={() => setIsOpen(true)}
            className="stories-button"
          >
            DELETE MOVIE
          </button>
        </div>
        
        {isOpen && portalRootRef.current && (
          <Dialog title="DELETE MOVIE" onClose={handleClose} portalRoot={portalRootRef.current}>
            <div className="stories-delete-content">
              <p className="stories-delete-message">
                Are you sure you want to delete this movie?
              </p>
              
              <div className="stories-movie-info">
                <p className="stories-movie-title">
                  <strong>{movieToDelete.title}</strong> ({movieToDelete.year})
                </p>
                <p className="stories-movie-genre">
                  {movieToDelete.genre}
                </p>
              </div>
              
              <button
                onClick={handleDelete}
                className="stories-confirm-button"
              >
                CONFIRM
              </button>
            </div>
          </Dialog>
        )}
        
        {isDeleted && (
          <div className="stories-deleted-message">
            <h3 className="stories-result-title">Movie Deleted Successfully</h3>
            <p className="stories-result-content">
              "{movieToDelete.title}" has been removed from your collection.
            </p>
          </div>
        )}
      </div>
    );
  },
};
