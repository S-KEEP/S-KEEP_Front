import {StyleSheet} from 'react-native';
import {theme} from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },

  headerContainer: {
    paddingTop: 100,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: theme.palette.secondary,
  },
  icon: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 16,
    paddingTop: 15,
  },
  itemCount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#D0D0D0', // Placeholder color for the icon
    borderRadius: 20,
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});
