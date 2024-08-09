import {StyleSheet} from 'react-native';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title_sb_21,
    marginTop: 30,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    marginTop: 10,
    width: '80%',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});

export default styles;
