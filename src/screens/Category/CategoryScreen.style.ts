import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: theme.palette.white,
  },
  title: {
    paddingLeft: 28,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    paddingLeft: 28,
    marginTop: 60,
  },
  cardWrapper: {
    width: Dimensions.get('window').width - 150,
  },
});

export default styles;
