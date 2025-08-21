import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing constants optimized for auth screens
const SIZES = {
  PADDING_HORIZONTAL: screenWidth * 0.04, // Reduced from 0.06 for better screen usage
  PADDING_VERTICAL: screenHeight * 0.03, // Reduced from 0.04 for better spacing
  GAP: screenWidth * 0.02,
  STANDARD_GAP: screenHeight * 0.02,
  PHONE_WIDTH: screenWidth * 0.75,
  PHONE_HEIGHT: screenHeight * 0.45,
} as const;

interface AuthLayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
  contentStyle?: any;
}

export default function AuthLayout({
  children,
  showStatusBar = true,
  statusBarStyle = 'dark-content',
  backgroundColor = Colors.background,
  contentStyle,
}: AuthLayoutProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {showStatusBar && (
        <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      )}
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_HORIZONTAL,
    paddingVertical: SIZES.PADDING_VERTICAL * 1.5, // Increased vertical padding
    justifyContent: 'flex-start',
    width: '100%', // Ensure full width usage
  },
});

// Export sizing constants for use in child components
export { SIZES };
