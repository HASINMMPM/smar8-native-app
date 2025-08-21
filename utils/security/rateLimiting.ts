import { SecurityConfig } from './SecurityConfig';

export class OnboardingRateLimiter {
  private static instance: OnboardingRateLimiter;
  private userSessions: Map<string, any> = new Map();

  static getInstance(): OnboardingRateLimiter {
    if (!OnboardingRateLimiter.instance) {
      OnboardingRateLimiter.instance = new OnboardingRateLimiter();
    }
    return OnboardingRateLimiter.instance;
  }

  canPerformAction(sessionId: string, actionType: 'navigation' | 'gesture'): boolean {
    const now = Date.now();
    const session = this.userSessions.get(sessionId) || this.initializeSession(sessionId);
    
    // Clean expired sessions
    if (now - session.lastActionTime > SecurityConfig.RATE_LIMIT.TIME_WINDOW) {
      this.resetSession(sessionId);
      return true;
    }

    const limit = actionType === 'navigation' 
      ? SecurityConfig.RATE_LIMIT.MAX_ACTIONS 
      : SecurityConfig.RATE_LIMIT.GESTURE_LIMIT;

    if (session[`${actionType}Count`] >= limit) {
      return false;
    }

    // Update session
    session[`${actionType}Count`]++;
    session.lastActionTime = now;
    this.userSessions.set(sessionId, session);
    
    return true;
  }

  private initializeSession(sessionId: string) {
    const session = {
      navigationCount: 0,
      gestureCount: 0,
      lastActionTime: Date.now(),
    };
    this.userSessions.set(sessionId, session);
    return session;
  }

  private resetSession(sessionId: string) {
    this.userSessions.delete(sessionId);
  }

  getSessionInfo(sessionId: string) {
    return this.userSessions.get(sessionId);
  }

  clearSession(sessionId: string) {
    this.userSessions.delete(sessionId);
  }
}

export const onboardingRateLimiter = OnboardingRateLimiter.getInstance();

