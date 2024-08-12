import {StyleSheet} from 'react-native';
import {flexBox} from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButtonStyle: {
    ...flexBox('column'),
    width: '80%',
    height: 45,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
export default styles;
