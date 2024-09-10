import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleProp, ViewStyle} from 'react-native';

interface IconProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}
export default function Icon({onPress, style, children}: IconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[{padding: 2}, style]}>
      {children}
    </TouchableOpacity>
  );
}
