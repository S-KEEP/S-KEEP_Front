import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: 63,
  },
  title: {
    ...theme.typography.title_sb_21,
    paddingLeft: 24,
    marginTop: 30,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    paddingLeft: 24,
    marginTop: 10,
    width: '80%',
  },
  contentContainer: {
    flex: 1,
  },
  gifContainer: {
    width: '100%',
    height: 300,
    marginTop: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButtonStyle: {
    ...flexBox('column'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default styles;
