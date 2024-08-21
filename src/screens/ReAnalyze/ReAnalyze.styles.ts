import {StyleSheet} from 'react-native';
import {flexBox, wrapper} from '../../styles/common';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    ...wrapper,
    ...flexBox('column'),
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.title_sb_21,
    color: theme.palette.black,
    marginTop: 50,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    marginTop: 11,
  },
});

export default styles;
