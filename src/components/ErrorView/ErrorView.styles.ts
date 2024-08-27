import {StyleSheet} from 'react-native';
import {flexBox, wrapper} from '../../styles/common';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    ...wrapper,
    ...flexBox('column', 'space-between'),
  },
  top: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 10,
  },
  bottom: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 300,
  },
  title: {
    ...theme.typography.title_sb_21,
    color: theme.palette.black,
    marginTop: 30,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
  },
});

export default styles;
