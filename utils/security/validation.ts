import { SecurityConfig } from './SecurityConfig';

export class OnboardingValidator {
  // Validate navigation routes
  static validateRoute(route: string): boolean {
    // For now, allow all routes since we're not using strict route validation
    return true;
  }

  // Validate step progression
  static validateStep(currentStep: number, targetStep: number): boolean {
    if (targetStep < 0 || targetStep >= SecurityConfig.SESSION.MAX_STEPS) {
      return false;
    }
    
    // Only allow moving one step at a time
    return Math.abs(targetStep - currentStep) === 1;
  }

  // Validate gesture parameters
  static validateGesture(dx: number, dy: number, vx: number, vy: number): boolean {
    const { MIN_SWIPE_DISTANCE, MAX_SWIPE_VELOCITY } = SecurityConfig.GESTURE;
    
    // Check if horizontal swipe is dominant
    if (Math.abs(dx) <= Math.abs(dy)) {
      return false;
    }
    
    // Check minimum distance
    if (Math.abs(dx) < MIN_SWIPE_DISTANCE) {
      return false;
    }
    
    // Check velocity limits
    if (Math.abs(vx) > MAX_SWIPE_VELOCITY || Math.abs(vy) > MAX_SWIPE_VELOCITY) {
      return false;
    }
    
    return true;
  }

  // Validate session integrity
  static validateSession(sessionData: any): boolean {
    if (!sessionData || typeof sessionData !== 'object') {
      return false;
    }
    
    const requiredFields = ['sessionId', 'currentStep', 'lastActionTime'];
    return requiredFields.every(field => sessionData.hasOwnProperty(field));
  }

  // Sanitize user input (if any)
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }
    
    // Remove potentially dangerous characters
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .trim();
  }

  // Check if action is within cooldown period
  static isWithinCooldown(lastActionTime: number): boolean {
    const now = Date.now();
    return (now - lastActionTime) < SecurityConfig.GESTURE.COOLDOWN_PERIOD;
  }
}

