import {StyleSheet} from 'react-native';
import {flexBox} from '../../styles/common';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title_sb_21,
    marginTop: 30,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    marginTop: 10,
    width: '80%',
  },
  retryContainer: {
    ...flexBox(),
    gap: 7,
    marginHorizontal: 'auto',
    marginTop: 15,
  },
  retryText: {
    ...theme.typography.body_m_15,
    color: theme.palette.gray6,
  },
});
export default styles;
