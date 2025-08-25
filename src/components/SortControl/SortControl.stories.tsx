import React, { useState } from 'react';
import { SortControl } from '../SortControl';

export default {
  title: 'SortControl',
  component: SortControl,
};

export const Default = () => {
  const [value, setValue] = useState<'releaseDate' | 'title'>('releaseDate');
  return <SortControl value={value} onChange={setValue} />;
};
