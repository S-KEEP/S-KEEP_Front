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
  onActionPress?: () => void;
}
export default function Snackbar() {
  const duration = 3000;
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [actionText, setActionText] = useState('');
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [actionCallback, setActionCallback] = useState<() => void>(() => {});

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'openSnackBar',
      ({message, actionText, content, onActionPress}: SnackbarProps) => {
        console.log('listern!');
        setMessage(message || '');
        setActionText(actionText || '');
        setActionCallback(() => onActionPress || (() => {}));
        setContent(content || null);

        setIsVisible(true);
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  if (!isVisible) return null;

  if (content) {
    return (
      <View style={[styles.container, styles.bottomContainer]}>{content}</View>
    );
  }

  return (
    <View style={[styles.container, styles.bottomContainer]}>
      <Text style={[styles.messageText]}>{message}</Text>
      {actionText && (
        <TouchableOpacity onPress={actionCallback}>
          <Text style={[styles.actionText]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
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
