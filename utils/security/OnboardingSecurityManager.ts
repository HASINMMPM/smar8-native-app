import { SecurityConfig, SecurityContext, SecurityLevel } from './SecurityConfig';
import { onboardingRateLimiter } from './rateLimiting';
import { OnboardingValidator } from './validation';
import { onboardingAuditLogger, AuditEvent } from './auditLogging';

export class OnboardingSecurityManager {
  private securityContext: SecurityContext;
  private sessionStartTime: number;

  constructor(sessionId: string, securityLevel: SecurityLevel = 'basic') {
    this.sessionStartTime = Date.now();
    this.securityContext = {
      sessionId,
      actionCount: 0,
      lastActionTime: Date.now(),
      gestureCount: 0,
      lastGestureTime: Date.now(),
      currentStep: 0,
      securityLevel,
    };
  }

  // Validate and execute navigation
  canNavigate(route: string): boolean {
    // Check if session is still valid
    if (this.isSessionExpired()) {
      onboardingAuditLogger.log('session_timeout', this.securityContext.sessionId, this.securityContext.currentStep);
      return false;
    }

    // Validate route
    if (!OnboardingValidator.validateRoute(route)) {
      onboardingAuditLogger.log('security_violation', this.securityContext.sessionId, this.securityContext.currentStep, {
        route,
        reason: 'invalid_route'
      });
      return false;
    }

    // Check rate limiting
    if (!onboardingRateLimiter.canPerformAction(this.securityContext.sessionId, 'navigation')) {
      onboardingAuditLogger.log('rate_limit_exceeded', this.securityContext.sessionId, this.securityContext.currentStep, {
        route,
        actionCount: this.securityContext.actionCount
      });
      return false;
    }

    // Log successful navigation attempt
    onboardingAuditLogger.log('navigation_success', this.securityContext.sessionId, this.securityContext.currentStep, {
      route,
      actionCount: this.securityContext.actionCount
    });

    // Update context
    this.securityContext.actionCount++;
    this.securityContext.lastActionTime = Date.now();

    return true;
  }

  // Validate and execute step change
  canChangeStep(targetStep: number): boolean {
    // Validate step progression
    if (!OnboardingValidator.validateStep(this.securityContext.currentStep, targetStep)) {
      onboardingAuditLogger.log('security_violation', this.securityContext.sessionId, this.securityContext.currentStep, {
        currentStep: this.securityContext.currentStep,
        targetStep,
        reason: 'invalid_step_progression'
      });
      return false;
    }

    // Check cooldown period
    if (OnboardingValidator.isWithinCooldown(this.securityContext.lastActionTime)) {
      onboardingAuditLogger.log('gesture_blocked', this.securityContext.sessionId, this.securityContext.currentStep, {
        reason: 'cooldown_period'
      });
      return false;
    }

    // Update context
    this.securityContext.currentStep = targetStep;
    this.securityContext.lastActionTime = Date.now();

    onboardingAuditLogger.log('gesture_success', this.securityContext.sessionId, this.securityContext.currentStep, {
      targetStep,
      gestureCount: this.securityContext.gestureCount
    });

    return true;
  }

  // Validate gesture
  canPerformGesture(dx: number, dy: number, vx: number, vy: number): boolean {
    // Check rate limiting for gestures
    if (!onboardingRateLimiter.canPerformAction(this.securityContext.sessionId, 'gesture')) {
      onboardingAuditLogger.log('rate_limit_exceeded', this.securityContext.sessionId, this.securityContext.currentStep, {
        gestureCount: this.securityContext.gestureCount
      });
      return false;
    }

    // Validate gesture parameters
    if (!OnboardingValidator.validateGesture(dx, dy, vx, vy)) {
      onboardingAuditLogger.log('gesture_blocked', this.securityContext.sessionId, this.securityContext.currentStep, {
        dx, dy, vx, vy,
        reason: 'invalid_gesture_parameters'
      });
      return false;
    }

    // Update context
    this.securityContext.gestureCount++;
    this.securityContext.lastGestureTime = Date.now();

    onboardingAuditLogger.log('gesture_attempt', this.securityContext.sessionId, this.securityContext.currentStep, {
      dx, dy, vx, vy,
      gestureCount: this.securityContext.gestureCount
    });

    return true;
  }

  // Check if session is expired
  private isSessionExpired(): boolean {
    const now = Date.now();
    return (now - this.sessionStartTime) > SecurityConfig.SESSION.TIMEOUT;
  }

  // Get current security context
  getSecurityContext(): SecurityContext {
    return { ...this.securityContext };
  }

  // Get security statistics
  getSecurityStats() {
    return {
      sessionId: this.securityContext.sessionId,
      sessionDuration: Date.now() - this.sessionStartTime,
      actionCount: this.securityContext.actionCount,
      gestureCount: this.securityContext.gestureCount,
      currentStep: this.securityContext.currentStep,
      securityLevel: this.securityContext.securityLevel,
      isExpired: this.isSessionExpired(),
    };
  }

  // Cleanup session
  cleanup() {
    onboardingRateLimiter.clearSession(this.securityContext.sessionId);
    onboardingAuditLogger.log('session_timeout', this.securityContext.sessionId, this.securityContext.currentStep, {
      reason: 'manual_cleanup'
    });
  }
}

export default OnboardingSecurityManager;

