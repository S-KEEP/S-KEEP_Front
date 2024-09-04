import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyText: {
    ...theme.typography.body_sb_17,
    color: theme.palette.black,
    marginBottom: 10,
  },
  emptySubText: {
    ...theme.typography.text_m_13,
    color: theme.palette.gray5,
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    ...flexBox('row', 'center', 'center'),
    backgroundColor: theme.palette.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  addButtonText: {
    ...theme.typography.button_sb_15,
    color: theme.palette.white,
  },
});
