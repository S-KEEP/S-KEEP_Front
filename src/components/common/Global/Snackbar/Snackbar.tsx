import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../../../styles';
import {flexBox} from '../../../../styles/common';

/**
 * 공통 컴포넌트 - 스낵바
 * (사용 예시)
 * DeviceEventEmitter.emit('openSnackbar', {
                message: '카테고리를 먼저 만들어주세요!',
                actionText: '만들기',
                onActionPress: () => console.log('hi'),
                duration: 5000,
              })
 */
export interface SnackbarProps {
  message?: string;
  actionText?: string;
  duration?: number | null;
  onActionPress?: () => void;
}

export default function Snackbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [actionText, setActionText] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [actionCallback, setActionCallback] = useState<() => void>(() => {});

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'openSnackbar',
      ({
        message = '',
        actionText = '',
        duration = null,
        onActionPress = () => {},
      }: SnackbarProps) => {
        setMessage(message);
        setActionText(actionText);
        setDuration(duration);
        setActionCallback(() => onActionPress);

        setIsVisible(true);
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible && duration !== null) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleClose}
      style={[styles.container, styles.bottomContainer]}>
      <>
        <Text style={[styles.messageText]}>{message}</Text>
        {actionText && (
          <TouchableOpacity
            onPress={() => {
              handleClose();
              actionCallback();
            }}>
            <Text style={[styles.actionText]}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </>
    </TouchableOpacity>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '90%',
    borderRadius: 10,
    ...flexBox('row', 'space-between'),
    position: 'absolute',
    left: width / 2 - (width * 0.9) / 2,
    backgroundColor: '#696969',
    opacity: 0.9,
    zIndex: 1000,
  },
  topContainer: {
    top: 30,
  },
  bottomContainer: {
    bottom: 30,
  },
  messageText: {
    ...theme.typography.body_m_15,
    color: theme.palette.white,
  },
  actionText: {
    marginLeft: 8,
    ...theme.typography.body_m_15,
    color: theme.palette.primary,
  },
});
