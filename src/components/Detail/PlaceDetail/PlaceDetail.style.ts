import {StyleSheet} from 'react-native';
import {flexBox, padding} from '../../../styles/common';
import {theme} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    ...flexBox('row', 'flex-start', 'center'),
    gap: 20,
    ...padding,
  },
  expanded: {
    ...flexBox('row', 'flex-start', 'flex-start'),
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  addressBox: {
    ...flexBox('row', 'flex-start', 'center'),
  },
  address: {
    ...theme.typography.body_m_16,
    marginTop: 10,
    width: '70%',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.body_sb_17,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default styles;
