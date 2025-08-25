import type { Preview } from '@storybook/react-webpack5';
import React from 'react';
import './preview.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="storybook-wrapper">
        <Story />
      </div>
    ),
  ],
};

export default preview;
