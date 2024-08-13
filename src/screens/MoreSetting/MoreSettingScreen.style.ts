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
  divider: {
    height: 1,
    backgroundColor: theme.palette.gray3,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 0,
  },
});

export default styles;
