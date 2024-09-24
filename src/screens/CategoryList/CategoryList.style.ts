import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: theme.palette.secondary,
    paddingTop: 10,
  },
  header: {
    width: '95%',
    ...flexBox('row', 'space-between'),
    paddingLeft: 28,
  },
  category: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  icon: {
    marginBottom: 20,
  },
  headerTitle: {
    ...theme.typography.title_sb_21,
  },
  headerDescription: {
    ...theme.typography.body_m_15,
    paddingTop: 15,
  },
  modalIcon: {
    marginBottom: 10,
  },
  itemCount: {
    padding: 20,
    paddingLeft: 28,
    ...theme.typography.sb_13,
  },
});
