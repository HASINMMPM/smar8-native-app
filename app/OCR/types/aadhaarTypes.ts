export interface AadhaarData {
  // Front side data
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  aadhaarNumber: string;
  
  // Back side data
  address: string;
  
  // Photos
  frontPhotoUri: string;
  backPhotoUri: string;
  personPhotoUri?: string;
  
  // Metadata
  extractionTimestamp: Date;
  confidence: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface FrontSideExtraction {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  aadhaarNumber: string;
  confidence: number;
}

export interface BackSideExtraction {
  address: string;
  confidence: number;
}

export interface ExtractionError {
  field: string;
  error: string;
  confidence: number;
}

export interface OCRResponse {
  success: boolean;
  data?: AadhaarData;
  errors?: ExtractionError[];
  message: string;
}
