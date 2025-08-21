import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../ui/Text';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  style?: any;
}

export default function AuthHeader({ title, subtitle, style }: AuthHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h1" color="textPrimary" style={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
