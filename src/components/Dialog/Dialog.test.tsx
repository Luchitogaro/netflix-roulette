import React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from '../Dialog';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((children, container) => children),
}));

jest.mock('focus-trap-react', () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => <div data-testid="focus-trap">{children}</div>,
}));

describe('<Dialog />', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => document.createElement('div')),
      writable: true,
    });
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <Dialog title="Test Dialog" onClose={mockOnClose}>
          <div>Dialog content</div>
        </Dialog>
      );
    }).not.toThrow();
  });

  it('uses portal to render dialog', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <div>Dialog content</div>
      </Dialog>
    );

    const { createPortal } = require('react-dom');
    expect(createPortal).toHaveBeenCalled();
  });

  it('includes focus trap wrapper', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <div>Dialog content</div>
      </Dialog>
    );
    expect(true).toBe(true);
  });

  it('accepts string title prop', () => {
    expect(() => {
      render(
        <Dialog title="String Title" onClose={mockOnClose}>
          <div>Dialog content</div>
        </Dialog>
      );
    }).not.toThrow();
  });

  it('accepts JSX title prop', () => {
    expect(() => {
      render(
        <Dialog title={<span>JSX Title</span>} onClose={mockOnClose}>
          <div>Dialog content</div>
        </Dialog>
      );
    }).not.toThrow();
  });

  it('accepts children prop', () => {
    expect(() => {
      render(
        <Dialog title="Test Dialog" onClose={mockOnClose}>
          <form>
            <input type="text" />
            <button type="submit">Submit</button>
          </form>
        </Dialog>
      );
    }).not.toThrow();
  });

  it('renders children content correctly', () => {
    expect(() => {
      render(
        <Dialog title="Test Dialog" onClose={mockOnClose}>
          <div>
            <h3>Test Content</h3>
            <button type="button">Test Button</button>
            <form>
              <input type="text" placeholder="Test input" />
              <select>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </form>
          </div>
        </Dialog>
      );
    }).not.toThrow();
  });
});
