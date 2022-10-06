import { PaletteOptions } from '@mui/material';

export type Colors = Record<
  | 'white'
  | 'whitish'
  | 'grayish'
  | 'blackish'
  | 'blueGrey'
  | 'blueGreyDark'
  | 'blueGreyLight',
  string
>;

export const colors: Colors = {
  whitish: '#fafafa',
  white: '#fff',
  grayish: '#c7c7c7',
  blueGrey: '#37474f',
  blueGreyLight: '#62727b',
  blueGreyDark: '#102027',
  blackish: '#212121',
};

export const palette: PaletteOptions = {
  primary: {
    main: colors.whitish,
    light: colors.white,
    dark: colors.grayish,
    contrastText: colors.blackish,
  },
  secondary: {
    main: colors.blueGrey,
    light: colors.blueGreyLight,
    dark: colors.blueGreyDark,
    contrastText: colors.whitish,
  },
};
