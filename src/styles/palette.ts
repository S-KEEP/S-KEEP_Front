import {TypeOfPalette} from './types/index';

const commonPalette = {
  gray1: '#E1DEDF',
  gray2: '#ECEDEF',
  gray3: '#D9D9D9',
  gray4: '#BDBDBD',
  gray5: '#9C9C9C',
  gray6: '#858585',
  white: '#ffffff',
  black: '#000000',
};

export const lightPalette: TypeOfPalette = {
  primary: '#43C7FF',
  secondary: '#DEDDF7',
  ...commonPalette,
};

export const darkPalette: TypeOfPalette = {
  primary: '#5E5CE6',
  secondary: '#1C1C45',
  ...commonPalette,
};
