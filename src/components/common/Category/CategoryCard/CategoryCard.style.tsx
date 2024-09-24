import {StyleSheet} from 'react-native';
import {flexBox} from '../../../../styles/common';
import {theme} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 28,
    ...flexBox('column'),
    gap: 10,
    width: 211,
    height: 260,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    ...theme.typography.Title2Bold,
  },
  description: {
    ...theme.typography.body_m_16,
    color: theme.palette.gray6,
  },
});

export default styles;
