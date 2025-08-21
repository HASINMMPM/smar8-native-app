import { SecurityConfig } from './SecurityConfig';

export type AuditEvent = 
  | 'navigation_attempt'
  | 'navigation_success'
  | 'navigation_blocked'
  | 'gesture_attempt'
  | 'gesture_success'
  | 'gesture_blocked'
  | 'rate_limit_exceeded'
  | 'security_violation'
  | 'session_timeout';

export interface AuditLogEntry {
  timestamp: number;
  event: AuditEvent;
  sessionId: string;
  currentStep: number;
  metadata: Record<string, any>;
  securityLevel: string;
}

export class OnboardingAuditLogger {
  private static instance: OnboardingAuditLogger;
  private logs: AuditLogEntry[] = [];
  private maxLogs: number = 100; // Keep only last 100 logs

  static getInstance(): OnboardingAuditLogger {
    if (!OnboardingAuditLogger.instance) {
      OnboardingAuditLogger.instance = new OnboardingAuditLogger();
    }
    return OnboardingAuditLogger.instance;
  }

  log(event: AuditEvent, sessionId: string, currentStep: number, metadata: Record<string, any> = {}, securityLevel: string = 'basic') {
    const logEntry: AuditLogEntry = {
      timestamp: Date.now(),
      event,
      sessionId,
      currentStep,
      metadata,
      securityLevel,
    };

    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (__DEV__) {
      console.log(`🔒 [SECURITY] ${event}:`, logEntry);
    }

    // In production, you could send to a logging service
    this.sendToLoggingService(logEntry);
  }

  private sendToLoggingService(logEntry: AuditLogEntry) {
    // This is where you'd implement actual logging service integration
    // For now, we'll just store locally
    // In production: Analytics, Crashlytics, or custom logging service
  }

  getLogs(sessionId?: string): AuditLogEntry[] {
    if (sessionId) {
      return this.logs.filter(log => log.sessionId === sessionId);
    }
    return [...this.logs];
  }

  getSecurityViolations(sessionId?: string): AuditLogEntry[] {
    const violations = this.logs.filter(log => 
      log.event === 'security_violation' || 
      log.event === 'rate_limit_exceeded'
    );
    
    if (sessionId) {
      return violations.filter(log => log.sessionId === sessionId);
    }
    
    return violations;
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const onboardingAuditLogger = OnboardingAuditLogger.getInstance();

