// Session utilities for OnboardingScreen security

// Generate a secure session ID
export function generateSecureSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const deviceInfo = getDeviceFingerprint();
  
  return `onboarding_${timestamp}_${randomPart}_${deviceInfo}`;
}

// Get device fingerprint (lightweight)
function getDeviceFingerprint(): string {
  // In a real app, you'd use expo-device or similar
  // For now, we'll create a simple fingerprint
  const screenInfo = `${Math.floor(Math.random() * 1000)}x${Math.floor(Math.random() * 1000)}`;
  const platform = 'react-native'; // You'd get this from Platform.OS
  
  return `${platform}_${screenInfo}`;
}

// Validate session ID format
export function isValidSessionId(sessionId: string): boolean {
  if (!sessionId || typeof sessionId !== 'string') {
    return false;
  }
  
  // Check if it follows our format: onboarding_timestamp_random_device
  const parts = sessionId.split('_');
  return parts.length >= 3 && parts[0] === 'onboarding';
}

// Check if session is expired
export function isSessionExpired(sessionStartTime: number, timeoutMs: number = 300000): boolean {
  const now = Date.now();
  return (now - sessionStartTime) > timeoutMs;
}

// Sanitize session data
export function sanitizeSessionData(data: any): any {
  if (!data || typeof data !== 'object') {
    return {};
  }
  
  const sanitized: any = {};
  
  // Only allow specific fields
  const allowedFields = [
    'sessionId', 'currentStep', 'lastActionTime', 
    'actionCount', 'gestureCount', 'securityLevel'
  ];
  
  allowedFields.forEach(field => {
    if (data.hasOwnProperty(field)) {
      sanitized[field] = data[field];
    }
  });
  
  return sanitized;
}

