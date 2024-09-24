import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../../styles';
import {flexBox, wrapperFull} from '../../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...flexBox('column'),
    backgroundColor: theme.palette.white,
    flex: 1,
    paddingBottom: 60,
    borderColor: 'red',
    borderWidth: 10,
  },
  title: {
    paddingLeft: 28,
    ...theme.typography.title_sb_21,
    alignSelf: 'flex-start',
  },
  subTitle: {
    ...theme.typography.body_m_15,
    marginBottom: 20,
    marginTop: 20,
  },
  cardContainer: {
    // paddingLeft: 28,
    // marginTop: 50,
  },
  cardWrapper: {
    width: Dimensions.get('window').width - 150,
  },
  addButton: {
    ...flexBox('row', 'center', 'center'),
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
