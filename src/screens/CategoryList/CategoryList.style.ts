import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: theme.palette.secondary,
  },
  icon: {
    marginBottom: 16,
  },
  backIcon: {
    width: '95%',
    ...flexBox('row', 'space-between'),
    position: 'absolute',
    zIndex: 9,
    top: 70,
    paddingLeft: 28,
  },
  headerTitle: {
    ...theme.typography.Title1Bold,
  },
  headerDescription: {
    ...theme.typography.title_m_16,
    paddingTop: 15,
  },
  itemCount: {
    padding: 15,
    paddingLeft: 28,
    ...theme.typography.title_m_16,
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
