// [Reference] https://velog.io/@chloedev/React-RN
import {Animated, StyleSheet, ViewStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';

interface ItemProps {
  style?: ViewStyle;
}

const Skeleton = ({style}: ItemProps) => {
  const animValue = useRef(new Animated.Value(0)).current;

  const interpolatedOpacity: Animated.AnimatedInterpolation<number> =
    animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.6, 0.9, 0.6],
    });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {opacity: interpolatedOpacity},
        style,
      ]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    minWidth: 20,
    minHeight: 16,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    borderRadius: 8,
  },
});

export default Skeleton;
