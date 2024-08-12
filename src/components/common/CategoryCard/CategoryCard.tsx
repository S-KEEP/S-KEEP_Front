import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import styles from './CategoryCard.style';

interface CardProps {
  title: string;
  description: string;
  IconComponent: React.ComponentType;
}

function Card({title, description, IconComponent}: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <IconComponent />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default Card;
