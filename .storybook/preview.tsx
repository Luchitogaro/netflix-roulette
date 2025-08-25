import type { Preview } from '@storybook/react-webpack5';
import React from 'react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#232323', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
