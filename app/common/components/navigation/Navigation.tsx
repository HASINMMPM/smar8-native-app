import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
  showNavigationHints?: boolean;
}

export default function Navigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
  showNavigationHints = true,
}: NavigationProps) {
  const router = useRouter();
  
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNavigation = (action: 'next' | 'previous' | 'skip' | 'complete') => {
    switch (action) {
      case 'next':
        if (onNext && !isLastStep) onNext();
        break;
      case 'previous':
        if (onPrevious && !isFirstStep) onPrevious();
        break;
      case 'skip':
        if (onSkip) onSkip();
        break;
      case 'complete':
        if (onComplete && isLastStep) onComplete();
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} of {totalSteps}
        </Text>
      </View>

      {/* Navigation Hints */}
      {showNavigationHints && (
        <View style={styles.navigationHints}>
          {!isFirstStep && (
            <Text style={styles.hintText}>
              ← Swipe left to go back
            </Text>
          )}
          {!isLastStep && (
            <Text style={styles.hintText}>
              Swipe right to continue →
            </Text>
          )}
        </View>
      )}

      {/* Navigation Actions */}
      <View style={styles.navigationActions}>
        {!isFirstStep && (
          <Text 
            style={[styles.navButton, styles.previousButton]}
            onPress={() => handleNavigation('previous')}
          >
            Previous
          </Text>
        )}
        
        {!isLastStep && (
          <Text 
            style={[styles.navButton, styles.nextButton]}
            onPress={() => handleNavigation('next')}
          >
            Next
          </Text>
        )}
        
        {isLastStep && (
          <Text 
            style={[styles.navButton, styles.completeButton]}
            onPress={() => handleNavigation('complete')}
          >
            Complete
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    margin: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  progressContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  
  navigationHints: {
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  
  hintText: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  
  navigationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    minWidth: 80,
  },
  
  previousButton: {
    backgroundColor: Colors.borderLight,
    color: Colors.textSecondary,
  },
  
  nextButton: {
    backgroundColor: Colors.primary,
    color: Colors.textInverse,
  },
  
  completeButton: {
    backgroundColor: Colors.primary,
    color: Colors.textInverse,
  },
});
