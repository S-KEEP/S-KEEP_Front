import {StyleSheet} from 'react-native';
import {flexBox} from '../../../../styles/common';
import {theme} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    ...flexBox('column', 'flex-start', 'center'),
    gap: 10,
    width: 210,
    height: 235,
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
