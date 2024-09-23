import {StyleSheet} from 'react-native';
import {theme} from '../../../styles';
import {flexBox, padding} from '../../../styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: theme.palette.white,
  },
  header: {
    width: '100%',
    ...padding,
    paddingBottom: 20,
  },
  friendContainer: {
    padding: 20,
  },
  centeredButton: {
    alignItems: 'center',
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
  profileSection: {
    ...flexBox('row', 'flex-start'),
    paddingLeft: 20,
    paddingBottom: 20,
  },
  profileTextContainer: {
    marginLeft: 15,
    gap: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailContainer: {
    ...flexBox('row', 'center'),
  },
  email: {
    fontSize: 14,
    color: theme.palette.gray5,
    marginRight: 5,
  },
  appleIcon: {
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: theme.palette.gray3,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 0,
  },
});

export default styles;
