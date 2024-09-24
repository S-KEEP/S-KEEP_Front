import {StyleSheet} from 'react-native';
import {theme} from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  FriendTopContainer: {
    backgroundColor: '#E3F7FF',
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  itemCount: {
    padding: 15,
    paddingLeft: 28,
    ...theme.typography.title_m_16,
  },
  title: {
    paddingTop: 29,
    ...theme.typography.title_sb_21,
  },
  subTitle: {
    paddingTop: 36,
    ...theme.typography.sb_13,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  categoryItem: {
    gap: 6,
    alignItems: 'center',
    marginRight: 16,
  },
  categoryText: {
    ...theme.typography.text_m_13,
    color: theme.palette.gray6,
  },
});
