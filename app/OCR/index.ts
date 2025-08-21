// OCR Services
export { default as AadhaarOCRService } from './services/aadhaarOCRService';
export { default as GoogleVisionService } from './services/GoogleVisionService';

// OCR Utilities
export { default as AadhaarExtractionUtils } from './utils/extractionUtils';

// OCR Types
export * from './types/aadhaarTypes';

// Main OCR Service (default export)
export { default } from './services/aadhaarOCRService';
