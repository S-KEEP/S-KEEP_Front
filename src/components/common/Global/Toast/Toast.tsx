import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../../../styles';
import {flexBox} from '../../../../styles/common';

/**
 * 공통 컴포넌트 - 토스트
 * (사용 예시)
 *    DeviceEventEmitter.emit('openToast', {
        content: (
          <View style={styles.snackbar}>
            <IcCheck />
            <Text style={styles.snackbarText}>
              {tourLocation.title}을 {category.name}에 저장했어요.
            </Text>
          </View>
        ),
      });
 */
interface ToastProps {
  content?: React.ReactNode;
  duration?: number;
}

export default function Toast() {
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState<number>(3000);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'openToast',
      ({content = null, duration = 3000}: ToastProps) => {
        setDuration(duration);
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
      {content}
    </TouchableOpacity>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 16,
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
