export interface CardProps {
  title: string;
  description: string;
  IconComponent: React.ComponentType;
  backgroundColor: string;
}

export interface CardData {
  backgroundColor: string;
  title: string;
  description: string;
  IconComponent: React.ComponentType<{}>;
}
