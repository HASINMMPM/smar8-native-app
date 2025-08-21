import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
  color?: keyof typeof Colors;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  fontFamily?: 'SpaceMono' | 'System';
}

export default function Text({
  children,
  variant = 'body',
  color = 'textPrimary',
  style,
  numberOfLines,
  fontFamily = 'System',
}: TextProps) {
  const textStyle = [
    styles[variant],
    { color: Colors[color] },
    fontFamily === 'SpaceMono' && styles.spaceMono,
    style,
  ].filter(Boolean);

  return (
    <RNText
      style={textStyle}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  spaceMono: {
    fontFamily: 'SpaceMono',
  },
});
