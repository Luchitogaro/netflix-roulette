import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Dialog } from './Dialog';
import './Dialog.stories.css';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
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
type Story = StoryObj<typeof Dialog>;

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
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
    
    return (
      <div>
        <h1 className="stories-title">Netflix Roulette</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="stories-button"
        >
          Open Dialog
        </button>
        
        {isOpen && portalRootRef.current && (
          <Dialog
            title="Interactive Dialog"
            onClose={() => setIsOpen(false)}
            portalRoot={portalRootRef.current}
          >
            <div>
              <p>This is an interactive dialog that can be opened and closed.</p>
              <p>Click the × button or outside the dialog to close it.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="stories-close-button"
              >
                Close Dialog
              </button>
            </div>
          </Dialog>
        )}
      </div>
    );
  },
};
