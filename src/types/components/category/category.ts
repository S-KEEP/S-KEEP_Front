export interface CardProps {
  title: string;
  description: string;
  IconComponent: React.ComponentType;
  backgroundColor: string;
  onPress?: () => void;
}

export interface CardData {
  backgroundColor: string;
  title: string;
  description: string;
  IconComponent: React.ComponentType<{}>;
}
