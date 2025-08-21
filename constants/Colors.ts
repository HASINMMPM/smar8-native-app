/**
 * Comprehensive color system for Smar8Manage app
 * Based on the Smar8Connect app design system
 * Maintains backward compatibility with existing light/dark themes
 */

// Primary brand colors
const primary = '#002E96';
const primaryDark = '#001A5E';
const primaryLight = '#1A47B8';

// Secondary colors
const secondary = '#F59E0B';
const secondaryDark = '#D97706';
const secondaryLight = '#FCD34D';

// Background colors
const background = '#FFFFFF';
const backgroundSecondary = '#F8FAFC';
const backgroundTertiary = '#F1F5F9';
const lightBackground = '#E3F2FD';
const selectedItemBackground = '#E3F2FD';

// Text colors
const textPrimary = '#1E293B';
const textSecondary = '#64748B';
const textTertiary = '#94A3B8';
const textInverse = '#FFFFFF';

// Status colors
const success = '#4CAF50';
const error = '#F44336';
const warning = '#FF9800';
const info = '#3B82F6';

// Border colors
const border = '#E2E8F0';
const borderLight = '#F1F5F9';

// Shadow colors
const shadow = 'rgba(0, 0, 0, 0.1)';
const shadowDark = 'rgba(0, 0, 0, 0.2)';

// Overlay colors
const overlay = 'rgba(0, 0, 0, 0.5)';

// Transparent
const transparent = 'transparent';

// Main Colors object with all color properties
export const Colors = {
  // Primary Colors (Dashboard Theme)
  primary,
  primaryDark,
  primaryLight,
  
  // Secondary Colors
  secondary,
  secondaryDark,
  secondaryLight,
  
  // Background Colors
  background,
  backgroundSecondary,
  backgroundTertiary,
  lightBackground,
  selectedItemBackground,
  
  // Text Colors
  textPrimary,
  textSecondary,
  textTertiary,
  textInverse,
  
  // Status Colors
  success,
  error,
  warning,
  info,
  
  // Border Colors
  border,
  borderLight,
  
  // Shadow Colors
  shadow,
  shadowDark,
  
  // Overlay Colors
  overlay,
  
  // Transparent
  transparent,
} as const;

// TypeScript type for color keys
export type ColorType = keyof typeof Colors;

// Backward compatibility with existing light/dark theme structure
export const light = {
  text: textPrimary,
  background: background,
  tint: primary,
  icon: textSecondary,
  tabIconDefault: textSecondary,
  tabIconSelected: primary,
};

export const dark = {
  text: textInverse,
  background: '#151718',
  tint: textInverse,
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: textInverse,
};

// Export the main Colors object as default for backward compatibility
export default Colors;
