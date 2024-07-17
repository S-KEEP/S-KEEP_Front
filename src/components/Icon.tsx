import {SvgProps} from 'react-native-svg';
import {theme} from '../styles';
import {KeyOfPalette} from '../styles/types';
import * as Icons from '../assets/icon';
import {KeyOfIcons} from '../types/components/Icon';

/**
 * @param name 아이콘명
 * @param size 아이콘 크기
 * @param fill 아이콘 색
 * @param style 추가적인 style 속성
 */
type IconProps = Omit<SvgProps, 'onPress'> & {
  name: KeyOfIcons;
  size?: number | undefined;
  fill?: KeyOfPalette;
  style?: React.CSSProperties | Array<React.CSSProperties>;
  onPress?: (...args: any[]) => void;
};

export default function Icon({
  name,
  fill = 'gray4',
  size = 24,
  ...props
}: IconProps) {
  // Ensure the icon exists
  const SvgIcon = Icons[name];

  if (!SvgIcon) {
    console.error(`Icon with name "${name}" does not exist in Icons`);
    return null;
  }

  // Ensure the theme color exists
  const color = theme.palette[fill];
  if (!color) {
    console.error(`Color "${fill}" does not exist in theme palette`);
    return null;
  }

  // Convert style to an array if necessary
  const styleArray = Array.isArray(props.style) ? props.style : [props.style];

  return <SvgIcon width={size} height={size} {...props} />;
}
