import {StyleSheet} from 'react-native';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: theme.palette.white,
  },
  title: {
    ...theme.typography.title_sb_21,
    textAlign: 'center',
    marginTop: 30,
    alignSelf: 'flex-start',
    paddingLeft: 24,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingLeft: 24,
  },
  iconContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  textBox: {
    padding: 20,
    backgroundColor: theme.palette.G01,
    width: '85%',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 40,
  },
  infoText: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
  },
  checkboxText: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray6,
    marginLeft: 10,
  },

  deleteButton: {
    width: '85%',
    bottom: 50,
    position: 'absolute',
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonEnabled: {
    backgroundColor: theme.palette.primary,
  },
  deleteButtonDisabled: {
    backgroundColor: theme.palette.gray3,
  },
  deleteButtonText: {
    color: theme.palette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
