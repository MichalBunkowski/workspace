import { render } from '@testing-library/react';
import React from 'react';

import Index from '../pages/index';
import { ThemeProvider } from '@mui/material';
import { theme } from '@workspace/theme';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <Index />
      </ThemeProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
