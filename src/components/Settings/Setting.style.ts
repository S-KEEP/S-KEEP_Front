import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: theme.palette.white,
  },
  loadingContainer: {},
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
  settingsContainer: {
    marginTop: 10,
  },
  settingItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    ...flexBox('row', 'space-between', 'center'),
  },
  settingText: {
    ...theme.typography.title_m_16,
  },
  versionText: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
  },
});

export default styles;
