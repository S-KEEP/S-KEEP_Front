// common.ts
import {ViewStyle} from 'react-native';
import {theme} from './theme';

export const flexBox = (
  direction: 'row' | 'column' = 'row',
  justify:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around' = 'center',
  align: 'center' | 'flex-start' | 'flex-end' | 'stretch' = 'center',
): ViewStyle => {
  return {
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
  };
};

export const wrapper: ViewStyle = {
  width: '100%',
  height: '100%',
  padding: 28,
  backgroundColor: theme.palette.white,
  // flex: 1,
};
