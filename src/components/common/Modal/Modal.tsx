import {View, Text, TouchableOpacity, Modal} from 'react-native';
import styles from './Modal.style';

type CommonModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  IconComponent: React.ReactNode;
  modalTitle: string;
  modalSubtitle: string;
  modalButtonCancelText: string;
  modalButtonConfirmText: string;
};

export default function CommonModal({
  visible,
  onClose,
  onConfirm,
  IconComponent,
  modalTitle,
  modalSubtitle,
  modalButtonCancelText,
  modalButtonConfirmText,
}: CommonModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {IconComponent}
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <Text style={styles.modalSubtitle}>{modalSubtitle}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={onClose}>
              <Text style={styles.modalButtonCancelText}>
                {modalButtonCancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={onConfirm}>
              <Text style={styles.modalButtonConfirmText}>
                {modalButtonConfirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
