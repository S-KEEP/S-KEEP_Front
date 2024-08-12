import {StyleSheet} from 'react-native';
import {flexBox, padding} from '../../../styles/common';
import {theme} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',

    width: 210,
    height: 235,
  },
  iconContainer: {
    marginBottom: 10,
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
