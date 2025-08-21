export const Typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  } as const,

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  } as const,

  // Line Heights (multiplier of font size)
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  } as const,

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  } as const,

  // Spacing (for margins, padding, etc.)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  } as const,

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  } as const,

  // Shadows
  shadow: {
    sm: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    md: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  } as const,
} as const;

// Type exports for TypeScript
export type FontSizeType = keyof typeof Typography.fontSize;
export type FontWeightType = keyof typeof Typography.fontWeight;
export type LineHeightType = keyof typeof Typography.lineHeight;
export type LetterSpacingType = keyof typeof Typography.letterSpacing;
export type SpacingType = keyof typeof Typography.spacing;
export type BorderRadiusType = keyof typeof Typography.borderRadius;
export type ShadowType = keyof typeof Typography.shadow;

// Helper function to get font size with line height
export const getFontStyle = (
  size: FontSizeType,
  weight: FontWeightType = 'regular',
  lineHeight: LineHeightType = 'normal'
) => ({
  fontSize: Typography.fontSize[size],
  fontWeight: Typography.fontWeight[weight],
  lineHeight: Typography.fontSize[size] * Typography.lineHeight[lineHeight],
});

// Helper function to get spacing
export const getSpacing = (size: SpacingType) => Typography.spacing[size];

// Helper function to get border radius
export const getBorderRadius = (size: BorderRadiusType) => Typography.borderRadius[size];


