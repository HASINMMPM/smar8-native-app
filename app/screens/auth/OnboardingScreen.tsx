import { Button, Swipe, Text } from '@/app/common/components/ui';
import OnboardingLayout, { styles } from '@/app/layouts/OnboardingLayout';
import { Colors } from '@/constants/Colors';
import {
  OnboardingSecurityManager,
  generateSecureSessionId,
  onboardingAuditLogger
} from '@/utils/security';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
} from 'react-native';

interface OnboardingStep {
  id: number;
  headline: string;
  description: string;
  image?: string;
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  
  // Security manager instance
  const [securityManager] = useState(() => 
    new OnboardingSecurityManager(generateSecureSessionId(), 'enhanced')
  );

  // Log session start
  useEffect(() => {
    onboardingAuditLogger.log('navigation_success', securityManager.getSecurityContext().sessionId, 0, {
      action: 'session_start',
      step: 0,
      timestamp: new Date().toISOString(),
      securityLevel: 'enhanced'
    });
  }, [securityManager, onboardingAuditLogger]);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      headline: 'Start as a Verified Resident',
      description: 'All users in Smar8 — owners, workers, coordinators — begin their journey as a registered resident. Your Aadhaar-linked registration ensures identity, security, and access across all Smar8 services.',
    },
    {
      id: 2,
      headline: 'One Identity, Many Possibilities',
      description: 'With a single Smar8 ID, you can - Live or work in registered buildings - Generate QR for check-ins - Access city services and payments & More',
    },
    {
      id: 3,
      headline: 'Secure, Simple & Smart',
      description: '₦20 one-time registration fee, Aadhaar verification, Digital welfare card for building access. Everything verified, everything recorded — your digital identity starts now.',
    },
  ];

  const handleNext = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      onboardingAuditLogger.log('navigation_success', securityManager.getSecurityContext().sessionId, currentStep + 1, {
        action: 'next',
        fromStep: currentStep,
        toStep: currentStep + 1,
        direction: 'forward'
      });
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, onboardingSteps.length, securityManager, onboardingAuditLogger]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      onboardingAuditLogger.log('navigation_success', securityManager.getSecurityContext().sessionId, currentStep - 1, {
        action: 'previous',
        fromStep: currentStep,
        toStep: currentStep - 1,
        direction: 'backward'
      });
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, securityManager, onboardingAuditLogger]);

  const handleSkip = useCallback(() => {
    onboardingAuditLogger.log('navigation_success', securityManager.getSecurityContext().sessionId, currentStep, {
      action: 'skip',
      fromStep: currentStep,
      destination: 'LoginScreen',
      completedSteps: currentStep + 1
    });
    router.push('/screens/auth/LoginScreen');
  }, [router, currentStep, securityManager, onboardingAuditLogger]);

  const handleGetStarted = useCallback(() => {
    onboardingAuditLogger.log('navigation_success', securityManager.getSecurityContext().sessionId, currentStep, {
      action: 'get_started',
      fromStep: currentStep,
      destination: 'SignUpScreen',
      completedSteps: onboardingSteps.length,
      onboardingCompleted: true
    });
    router.push('/screens/auth/SignUpScreen');
  }, [router, currentStep, onboardingSteps.length, securityManager, onboardingAuditLogger]);

  const handleSwipeLeft = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      onboardingAuditLogger.log('gesture_success', securityManager.getSecurityContext().sessionId, currentStep, {
        gesture: 'swipe_left',
        direction: 'forward'
      });
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, onboardingSteps.length, securityManager, onboardingAuditLogger]);

  const handleSwipeRight = useCallback(() => {
    if (currentStep > 0) {
      onboardingAuditLogger.log('gesture_success', securityManager.getSecurityContext().sessionId, currentStep, {
        gesture: 'swipe_right',
        direction: 'backward'
      });
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, securityManager, onboardingAuditLogger]);

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const skipButton = (
    <Button
      title="Skip"
      onPress={handleSkip}
      variant="ghost"
      size="small"
      style={styles.skipButton}
    />
  );

  const bottomButton = (
    <Button
      title={isLastStep ? "Get started" : "Next"}
      onPress={isLastStep ? handleGetStarted : handleNext}
      variant="primary"
      size="large"
      style={styles.actionButton}
    />
  );

  return (
    <OnboardingLayout 
      backgroundColor={Colors.backgroundSecondary}
      statusBarStyle="dark-content"
      skipButton={skipButton}
    >
      <Swipe
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        enableHorizontal={true}
        enableVertical={false}
        minSwipeDistance={50}
        minSwipeVelocity={0.5}
      >
        <View style={styles.phoneMockupContainer}>
          <View style={styles.phoneMockup}>
            <View style={styles.imagePlaceholder}>
              <Text variant="h3" color="textSecondary" style={styles.placeholderText}>
                Image Placeholder
              </Text>
              <Text variant="caption" color="textTertiary" style={styles.placeholderSubtext}>
                Onboarding
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.dotsContainer}>
          {Array.from({ length: onboardingSteps.length }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.textContentContainer}>
          <Text variant="h3" color="textPrimary" style={styles.headline}>
            {currentStepData.headline}
          </Text>
          <Text variant="body" color="textSecondary" style={styles.description}>
            {currentStepData.description}
          </Text>
        </View>
      </Swipe>
      
      {bottomButton}
    </OnboardingLayout>
  );
}

// All styles are now handled by OnboardingLayout
