import {StyleSheet} from 'react-native';
import {theme} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: theme.palette.white,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 9,
    top: 70,
    left: 0,
    paddingLeft: 24,
  },
  title: {
    ...theme.typography.title_sb_21,
    textAlign: 'center',
    marginTop: 20,
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
    alignItems: 'center',

    padding: 20,
    backgroundColor: theme.palette.gray1,
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
  checkbox: {
    transform: [{scale: 0.8}],
  },
  infoTextTitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.black,
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
    marginLeft: 4,
  },

  deleteButton: {
    width: '85%',
    bottom: 50,
    position: 'absolute',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonEnabled: {
    backgroundColor: theme.palette.primary,
  },
  deleteButtonDisabled: {
    backgroundColor: theme.palette.gray4,
  },
  deleteButtonText: {
    color: theme.palette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonCancel: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  modalButtonCancelText: {
    color: '#555',
  },
  modalButtonConfirm: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonConfirmText: {
    color: 'white',
  },
});

export default styles;
