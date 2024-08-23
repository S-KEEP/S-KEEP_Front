import {StyleSheet} from 'react-native';
import {flexBox} from '../../styles/common';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButtonStyle: {
    ...flexBox('row', 'center', 'center'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    gap: 10,
    padding: 10,
    width: 335,
    height: 56,
  },
  buttonText: {
    ...theme.typography.Body1Regular,
    color: theme.palette.white,
  },
});
export default styles;
