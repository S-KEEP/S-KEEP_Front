import {StyleSheet} from 'react-native';
import {flexBox} from '../../../styles/common';
import {theme} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: '90%',
  },
  image: {
    width: 190,
    height: 190,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginHorizontal: 'auto',
  },
  box: {
    width: '100%',
    ...flexBox('column', 'center', 'flex-start'),
    gap: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderColor: '#EDEDED',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'stretch',
  },
  boxItem: {
    ...flexBox('row', 'flex-start', 'center'),
    gap: 10,
    flex: 1,
  },
  boxItemWSpace: {...flexBox('row', 'space-between'), width: '100%'},
  text: {
    ...theme.typography.body_m_16,
  },
});
export default styles;
