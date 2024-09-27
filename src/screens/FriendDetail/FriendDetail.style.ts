import {StyleSheet} from 'react-native';
import {flexBox, padding} from '../../styles/common';
import {theme} from '../../styles';

export const styles = StyleSheet.create({
  categoryBox: {
    ...flexBox('row', 'flex-start'),
    ...padding,
    paddingVertical: 20,

    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
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
  snackbar: {
    ...flexBox(),
    gap: 10,
    width: '100%',
  },
  snackbarText: {
    ...theme.typography.text_m_13,
    color: theme.palette.white,
  },
  buttonWrapper: {
    width: '100%',
    ...padding,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
  },

  header: {
    ...flexBox('row', 'space-between'),
    ...padding,
  },
  deleteText: {
    ...theme.typography.body_m_15,
    color: '#797979',
  },
  modalIcon: {
    marginBottom: 10,
  },
});
