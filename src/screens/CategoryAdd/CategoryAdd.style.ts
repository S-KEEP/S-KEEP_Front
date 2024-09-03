import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: theme.palette.white,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: 375,
    padding: 28,
  },
  title: {
    paddingLeft: 28,
    ...theme.typography.title_sb_21,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  inputWrapper: {
    marginTop: 15,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.palette.gray4,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.gray3,
    paddingVertical: 8,
    fontSize: 16,
    color: theme.palette.black,
  },
  countContainer: {
    ...flexBox('row', 'space-between'),
  },
  charCount: {
    fontSize: 12,
    color: theme.palette.gray5,
    textAlign: 'right',
    marginTop: 4,
  },
  helperWrapper: {
    marginVertical: 20,
    backgroundColor: theme.palette.gray1,
    padding: 10,
    borderRadius: 4,
  },
  helperText: {
    fontSize: 12,
    color: theme.palette.gray6,
    textAlign: 'center',
  },
  createButtonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: theme.palette.white,
  },
  createButton: {
    width: '100%',
    backgroundColor: theme.palette.primary,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: theme.palette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
