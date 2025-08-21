import React, { useMemo } from 'react';
import { View, PanResponder, ViewStyle } from 'react-native';

interface SwipeProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
  minSwipeVelocity?: number;
  enableHorizontal?: boolean;
  enableVertical?: boolean;
  enableDiagonal?: boolean;
  diagonalThreshold?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function Swipe({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50,
  minSwipeVelocity = 0.5,
  enableHorizontal = true,
  enableVertical = false,
  enableDiagonal = false,
  diagonalThreshold = 0.7,
  style,
  disabled = false,
}: SwipeProps) {
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      if (disabled) return false;
      
      const { dx, dy } = gestureState;
      const horizontalMovement = Math.abs(dx) > 10;
      const verticalMovement = Math.abs(dy) > 10;
      
      // Enable gesture detection based on configuration
      if (enableHorizontal && horizontalMovement) return true;
      if (enableVertical && verticalMovement) return true;
      if (enableDiagonal && (horizontalMovement || verticalMovement)) return true;
      
      return false;
    },
    onPanResponderGrant: () => {
      // Optional: Add visual feedback when gesture starts
    },
    onPanResponderMove: () => {
      // Optional: Add visual feedback during gesture
    },
    onPanResponderRelease: (_, gestureState) => {
      if (disabled) return;
      
      const { dx, dy, vx, vy } = gestureState;
      const horizontalDistance = Math.abs(dx);
      const verticalDistance = Math.abs(dy);
      const horizontalVelocity = Math.abs(vx);
      const verticalVelocity = Math.abs(vy);
      
      // Check if gesture meets minimum requirements
      const horizontalSwipe = horizontalDistance > minSwipeDistance || horizontalVelocity > minSwipeVelocity;
      const verticalSwipe = verticalDistance > minSwipeDistance || verticalVelocity > minSwipeVelocity;
      
      // Determine primary direction for diagonal swipes
      if (enableDiagonal && horizontalSwipe && verticalSwipe) {
        const horizontalRatio = horizontalDistance / (horizontalDistance + verticalDistance);
        const isHorizontalPrimary = horizontalRatio > diagonalThreshold;
        
        if (isHorizontalPrimary) {
          // Handle as horizontal swipe
          if (dx < 0) {
            onSwipeLeft?.();
          } else {
            onSwipeRight?.();
          }
        } else {
          // Handle as vertical swipe
          if (dy < 0) {
            onSwipeUp?.();
          } else {
            onSwipeDown?.();
          }
        }
        return;
      }
      
      // Handle horizontal swipes
      if (enableHorizontal && horizontalSwipe) {
        if (dx < 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
      
      // Handle vertical swipes
      if (enableVertical && verticalSwipe) {
        if (dy < 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    },
    onPanResponderTerminate: () => {
      // Optional: Handle when gesture is interrupted
    },
  }), [
    disabled,
    enableHorizontal,
    enableVertical,
    enableDiagonal,
    diagonalThreshold,
    minSwipeDistance,
    minSwipeVelocity,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);

  return (
    <View 
      style={style} 
      {...panResponder.panHandlers}
    >
      {children}
    </View>
  );
}
