import {StyleSheet} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...flexBox(),
  },
  modalContainer: {
    width: '80%',
    backgroundColor: theme.palette.white,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    ...theme.typography.body_sb_17,
    marginBottom: 10,
  },
  modalSubtitle: {
    ...theme.typography.body_m_15,
    color: theme.palette.gray5,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    ...flexBox('row', 'space-between'),
  },
  modalButtonCancel: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 9,
    marginRight: 10,
  },
  modalButtonCancelText: {
    color: theme.palette.white,
  },
  modalButtonConfirm: {
    backgroundColor: theme.palette.gray3,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 9,
  },
  modalButtonConfirmText: {
    color: theme.palette.gray5,
  },
});
