import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from './Text';

interface DividerProps {
  text?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  thickness?: number;
  spacing?: number;
}

export default function Divider({
  text,
  orientation = 'horizontal',
  variant = 'solid',
  color = Colors.border,
  thickness = 1,
  spacing = 16,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <View style={[
        styles.vertical,
        { width: thickness, backgroundColor: color },
        styles[variant],
      ]} />
    );
  }

  if (text) {
    return (
      <View style={styles.horizontalWithText}>
        <View style={[
          styles.line,
          { height: thickness, backgroundColor: color },
          styles[variant],
        ]} />
        <Text 
          variant="caption" 
          color="textTertiary" 
          style={{ textAlign: 'center', marginHorizontal: spacing }}
        >
          {text}
        </Text>
        <View style={[
          styles.line,
          { height: thickness, backgroundColor: color },
          styles[variant],
        ]} />
      </View>
    );
  }

  return (
    <View style={[
      styles.horizontal,
      { height: thickness, backgroundColor: color },
      styles[variant],
    ]} />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  horizontalWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
  line: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  solid: {},
  dashed: {
    borderStyle: 'dashed',
  },
  dotted: {
    borderStyle: 'dotted',
  },
});
