import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing constants for onboarding
const SIZES = {
  PADDING_HORIZONTAL: screenWidth * 0.06,
  PADDING_VERTICAL: screenHeight * 0.04,
  GAP: screenWidth * 0.02,
  STANDARD_GAP: screenHeight * 0.02,
  PHONE_WIDTH: screenWidth * 0.75,
  PHONE_HEIGHT: screenHeight * 0.45,
} as const;

interface OnboardingLayoutProps {
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  children: React.ReactNode;
}

export default function OnboardingLayout({
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  children,
}: OnboardingLayoutProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      
      {/* Skip Button Container - Positioned absolutely */}
      <View style={styles.skipButtonContainer}>
        {/* Skip button will be provided by children */}
      </View>
      
      {/* Scrollable Content Area */}
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      
      {/* Fixed Bottom Button Area */}
      <View style={styles.bottomButtonContainer}>
        {/* Bottom button will be provided by children */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButtonContainer: {
    position: 'absolute',
    top: SIZES.PADDING_VERTICAL * 1.5,
    right: SIZES.PADDING_HORIZONTAL,
    zIndex: 10,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_HORIZONTAL,
    paddingTop: SIZES.PADDING_VERTICAL * 3,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: SIZES.PADDING_VERTICAL * 0.2,
  },
  bottomButtonContainer: {
    paddingHorizontal: SIZES.PADDING_HORIZONTAL,
    paddingVertical: SIZES.PADDING_VERTICAL * 0.3,
    backgroundColor: 'transparent',
  },
  
  // Phone Mockup Container - ALL positioning and dimensions
  phoneMockupContainer: {
    width: SIZES.PHONE_WIDTH,
    height: SIZES.PHONE_HEIGHT,
    alignSelf: 'center',
    marginBottom: SIZES.STANDARD_GAP * 2,
    flex: 1,
    padding: SIZES.GAP * 2,
  },
  
  // Progress Dots Container - ALL positioning and spacing
  progressDotsContainer: {
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  // Text Content Container - ALL positioning and spacing
  textContentContainer: {
    paddingHorizontal: SIZES.PADDING_HORIZONTAL * 0.5,
    alignItems: 'center',
    marginBottom: SIZES.STANDARD_GAP * 2,
  },
  
  // Action Button Container - ALL dimensions
  actionButtonContainer: {
    width: '100%',
  },
  
  // Placeholder Text Container - ALL positioning
  placeholderTextContainer: {
    textAlign: 'center',
    marginBottom: SIZES.GAP,
  },
  
  // Placeholder Subtext Container - ALL positioning
  placeholderSubtextContainer: {
    textAlign: 'center',
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  // Headline Container - ALL positioning
  headlineContainer: {
    textAlign: 'center',
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  // Description Container - ALL positioning
  descriptionContainer: {
    textAlign: 'center',
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  // Phone Mockup Visual Styles
  phoneMockup: {
    width: SIZES.PHONE_WIDTH,
    height: SIZES.PHONE_HEIGHT,
    backgroundColor: Colors.background,
    borderRadius: SIZES.GAP * 3,
    padding: SIZES.GAP * 3,
    alignSelf: 'center',
    marginBottom: SIZES.STANDARD_GAP * 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.GAP * 2,
    elevation: 3,
  },
  
  // Image Placeholder Visual Styles
  imagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    borderRadius: SIZES.GAP * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    padding: SIZES.GAP * 2,
  },
  
  // Progress Dots Visual Styles
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.GAP,
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  dot: {
    width: SIZES.GAP,
    height: SIZES.GAP,
    borderRadius: SIZES.GAP / 2,
    backgroundColor: Colors.borderLight,
  },
  
  activeDot: {
    backgroundColor: Colors.primary,
    width: SIZES.GAP * 3,
  },
  
  // Text Visual Styles
  placeholderText: {
    textAlign: 'center',
    marginBottom: SIZES.GAP,
  },
  
  placeholderSubtext: {
    textAlign: 'center',
    fontSize: 12,
  },
  
  headline: {
    textAlign: 'center',
    marginBottom: SIZES.STANDARD_GAP * 0.5,
  },
  
  description: {
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Button Container Styles
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  
  actionButton: {
    width: '100%',
  },
});

// Export sizing constants and styles for use in OnboardingScreen
export { SIZES, styles };
