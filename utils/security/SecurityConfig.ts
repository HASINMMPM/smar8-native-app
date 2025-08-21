// Security Configuration for OnboardingScreen
export const SecurityConfig = {
  // Rate Limiting
  RATE_LIMIT: {
    MAX_ACTIONS: 15, // Max navigation actions per minute
    TIME_WINDOW: 60000, // 1 minute window
    GESTURE_LIMIT: 20, // Max gesture attempts per minute
  },
  
  // Session Security
  SESSION: {
    TIMEOUT: 300000, // 5 minutes timeout
    MAX_STEPS: 3, // Maximum onboarding steps
    VALID_ROUTES: [
      '/screens/auth/LoginScreen',
      '/screens/auth/SignUpScreen'
    ],
  },
  
  // Gesture Security
  GESTURE: {
    MIN_SWIPE_DISTANCE: 50,
    MAX_SWIPE_VELOCITY: 0.8,
    COOLDOWN_PERIOD: 500, // 500ms between gestures
  },
  
  // Validation
  VALIDATION: {
    ENABLE_INPUT_SANITIZATION: true,
    ENABLE_ROUTE_VALIDATION: true,
    ENABLE_GESTURE_VALIDATION: true,
  }
} as const;

export type SecurityLevel = 'basic' | 'enhanced' | 'strict';
export type SecurityContext = {
  sessionId: string;
  actionCount: number;
  lastActionTime: number;
  gestureCount: number;
  lastGestureTime: number;
  currentStep: number;
  securityLevel: SecurityLevel;
};

