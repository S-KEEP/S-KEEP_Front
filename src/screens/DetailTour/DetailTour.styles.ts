import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox, padding} from '../../styles/common';

export const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    ...padding,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
  },
  snackbar: {
    ...flexBox(),
    gap: 10,
    width: '100%',
  },
  snackbarText: {
    ...theme.typography.text_m_13,
    color: theme.palette.white,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    ...flexBox(),
    backgroundColor: theme.palette.black,
    opacity: 0.5,
  },
});
