import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: theme.palette.white,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingLeft: 28,
    ...theme.typography.title_sb_21,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  subTitle: {
    top: -130,
    textAlign: 'center',
    ...theme.typography.body_m_15,
    marginBottom: 20,
  },
  cardContainer: {
    paddingLeft: 28,
    marginTop: 80,
  },
  cardWrapper: {
    width: Dimensions.get('window').width - 150,
  },
  addButton: {
    ...flexBox('row', 'center', 'center'),
    top: -130,
    backgroundColor: theme.palette.primary,
    paddingVertical: 12,
    gap: 5,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  addButtonText: {
    color: theme.palette.white,
    ...theme.typography.button_sb_15,
  },
});

export default styles;
