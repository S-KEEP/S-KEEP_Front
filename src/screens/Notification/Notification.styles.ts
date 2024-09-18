import {StyleSheet} from 'react-native';
import {theme} from '../../styles';
import {flexBox, padding} from '../../styles/common';

export const styles = StyleSheet.create({
  header: {
    ...flexBox('row', 'space-between'),
    ...padding,
  },
  title: {
    ...padding,
    ...theme.typography.title_sb_21,
    marginVertical: 25,
  },
});
