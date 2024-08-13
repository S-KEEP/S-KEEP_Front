import {StyleSheet} from 'react-native';
import {flexBox, padding} from '../../../styles/common';
import {theme} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    ...flexBox('row', 'flex-start'),
    gap: 20,
    ...padding,
    top: 50,
  },
  image: {
    width: 80,
    height: 80,
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
