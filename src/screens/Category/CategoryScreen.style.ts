import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox, padding} from '../../styles/common';

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
  container: {
    backgroundColor: theme.palette.white,
    marginTop: 50,
    flex: 1,
    ...padding,
  },
  cardContainer: {
    ...flexBox('row'),
    marginTop: 80,
    gap: 25,
  },
});

export default styles;
