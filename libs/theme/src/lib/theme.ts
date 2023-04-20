import { createTheme } from '@mui/material/styles';

import { color, Color, palette } from './palette';

declare module '@mui/material/styles' {
  interface Theme {
    color: Color;
  }

  interface ThemeOptions {
    color?: Color;
  }
}

export const theme = createTheme({
  color: color,
  palette: {
    mode: 'light',
    ...palette,
  },
});
