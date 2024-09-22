import {StyleSheet} from 'react-native';
import {flexBox} from '../../styles/common';
import {theme} from '../../styles';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centeredButton: {
    alignItems: 'center', // 버튼만 중앙 정렬
  },
  addButton: {
    ...flexBox('row', 'center', 'center'),
    backgroundColor: theme.palette.primary,
    paddingVertical: 12,
    gap: 5,
    width: 230,
    borderRadius: 30,
  },
  addButtonText: {
    color: theme.palette.white,
    ...theme.typography.button_sb_15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  kakaoButton: {
    backgroundColor: '#3AB0FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  kakaoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
