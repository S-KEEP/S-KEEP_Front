import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

interface SnackbarProps {
  message?: string;
  actionText?: string;
  content?: React.ReactNode;
  onActionPress: () => void;
  duration?: number;
  position?: string;
}
export default function Snackbar({
  message,
  actionText,
  content,
  onActionPress,
  duration = 3000,
  position = 'bottom',
}: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      //   const timeout = setTimeout(() => {
      //     setIsVisible(false);
      //   }, duration);
      //   return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  if (content) {
    return isVisible ? (
      <View
        style={[
          styles.container,
          position === 'top' ? styles.topContainer : styles.bottomContainer,
        ]}>
        {content}
      </View>
    ) : null;
  }

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === 'top' ? styles.topContainer : styles.bottomContainer,
      ]}>
      <Text style={[styles.messageText]}>{message}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={[styles.actionText]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
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
