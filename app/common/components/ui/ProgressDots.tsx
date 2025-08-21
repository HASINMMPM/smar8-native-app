import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  activeWidth?: number;
  inactiveWidth?: number;
  height?: number;
  gap?: number;
  borderRadius?: number;
}

export default function ProgressDots({
  totalSteps,
  currentStep,
  activeColor = Colors.primary,
  inactiveColor = Colors.borderLight,
  activeWidth = 24,
  inactiveWidth = 8,
  height = 8,
  gap = 8,
  borderRadius = 4,
}: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              width: index === currentStep ? activeWidth : inactiveWidth,
              height,
              borderRadius,
              backgroundColor: index === currentStep ? activeColor : inactiveColor,
              marginRight: index < totalSteps - 1 ? gap : 0,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    // Individual dot styling handled by inline styles for flexibility
  },
});
