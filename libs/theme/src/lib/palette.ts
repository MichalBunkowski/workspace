import { PaletteOptions } from '@mui/material';

export type Color = Record<
  | 'white'
  | 'whitish'
  | 'grayish'
  | 'blackish'
  | 'blueGrey'
  | 'blueGreyDark'
  | 'blueGreyLight'
  | 'yellow'
  | 'yellowAlpha'
  | 'green'
  | 'greenAlpha'
  | 'red'
  | 'redAlpha',
  string
>;

export const color: Color = {
  whitish: '#fafafa',
  white: '#fff',
  grayish: '#c7c7c7',
  blueGrey: '#37474f',
  blueGreyLight: '#62727b',
  blueGreyDark: '#102027',
  blackish: '#212121',
  yellow: '#e6b80f',
  yellowAlpha: 'rgba(230,184,15,0.2)',
  green: '#2b980d',
  greenAlpha: 'rgba(43, 152, 13,0.2)',
  red: '#980d0d',
  redAlpha: 'rgba(152, 13, 13, 0.2)',
};

export const palette: PaletteOptions = {
  primary: {
    main: color.whitish,
    light: color.white,
    dark: color.grayish,
    contrastText: color.blackish,
  },
  secondary: {
    main: color.blueGrey,
    light: color.blueGreyLight,
    dark: color.blueGreyDark,
    contrastText: color.whitish,
  },
};
