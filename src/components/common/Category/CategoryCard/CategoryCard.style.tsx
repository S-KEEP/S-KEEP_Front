import {StyleSheet} from 'react-native';
import {flexBox, padding} from '../../../../styles/common';
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
    textAlign: 'left', // 타이틀만 왼쪽 정렬
    alignSelf: 'flex-start', // 타이틀만 왼쪽 정렬
    ...theme.typography.Title2Bold,
  },
  description: {
    ...theme.typography.body_m_16,
    color: '#555',
  },
});

export default styles;
