import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../../../styles';
import {flexBox} from '../../../../styles/common';

interface SnackbarProps {
  message?: string;
  actionText?: string;
  content?: React.ReactNode;
  duration?: number | null; // duration을 null로 설정하면 사라지지 않음
  onActionPress?: () => void;
}

export default function Snackbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [actionText, setActionText] = useState('');
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [actionCallback, setActionCallback] = useState<() => void>(() => {});

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'openSnackBar',
      ({
        message = '',
        actionText = '',
        content = null,
        duration = null,
        onActionPress = () => {},
      }: SnackbarProps) => {
        setMessage(message);
        setActionText(actionText);
        setDuration(duration);
        setActionCallback(() => onActionPress);
        setContent(content || null);

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
      {content ? (
        content
      ) : (
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
      )}
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
