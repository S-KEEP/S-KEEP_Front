import {StyleSheet} from 'react-native';
import {theme} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    ...theme.typography.body_sb_17,
    marginBottom: 20,
  },
  list: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCategoryItem: {
    backgroundColor: theme.palette.gray1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  categoryText: {
    ...theme.typography.body_m_16,
  },
});

export default styles;
