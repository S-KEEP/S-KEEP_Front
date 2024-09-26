import {Dimensions, Platform, StyleSheet} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

const {height} = Dimensions.get('window');

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
    marginTop: 30,
    textAlign: 'center',
    ...theme.typography.body_m_15,
    marginBottom: 10,
  },
  cardContainer: {
    paddingLeft: 28,
    marginTop: 50,
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
    marginTop: 10,
    // iOS 기기에 따른 조건부 marginBottom 설정
    // height 667은 iPhone SE의 높이. 이보다 크면 60, 아니면 30
    marginBottom: Platform.OS === 'ios' && height <= 667 ? 30 : 80,
  },
  addButtonText: {
    color: theme.palette.white,
    ...theme.typography.button_sb_15,
  },
});

export default styles;
