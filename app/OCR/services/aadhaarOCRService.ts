import {
    AadhaarData,
    ExtractionError,
    OCRResponse
} from '../types/aadhaarTypes';
import AadhaarExtractionUtils from '../utils/extractionUtils';
import GoogleVisionService from './GoogleVisionService';

export class AadhaarOCRService {
  private googleVisionService: GoogleVisionService;

  constructor() {
    this.googleVisionService = new GoogleVisionService();
  }

  /**
   * Extract data from front side of Aadhaar card
   */
  async extractFrontSide(imageUri: string): Promise<OCRResponse> {
    try {
      console.log('Starting front side extraction...');
      console.log('Image URI:', imageUri);
      
      // Validate image URI
      if (!imageUri) {
        return {
          success: false,
          message: 'No image URI provided',
          errors: [{
            field: 'general',
            error: 'Image URI is missing',
            confidence: 0
          }]
        };
      }
      
      // Extract text using Google Vision API
      const ocrResults = await this.googleVisionService.extractTextWithLanguageHints(
        imageUri, 
        ['en', 'hi'] // English and Hindi
      );

      if (ocrResults.length === 0) {
        return {
          success: false,
          message: 'No text found in the image',
          errors: [{
            field: 'general',
            error: 'No text detected',
            confidence: 0
          }]
        };
      }

      console.log(`Found ${ocrResults.length} text blocks`);

      // Extract Aadhaar data using layout-based extraction
      const frontExtraction = AadhaarExtractionUtils.extractFrontSideData(ocrResults);

      // Validate extracted data
      const errors: ExtractionError[] = [];
      
      if (!frontExtraction.name) {
        errors.push({
          field: 'name',
          error: 'Name not found',
          confidence: frontExtraction.confidence
        });
      }

      if (!frontExtraction.fatherName) {
        errors.push({
          field: 'fatherName',
          error: 'Father\'s name not found',
          confidence: frontExtraction.confidence
        });
      }

      if (!frontExtraction.dateOfBirth) {
        errors.push({
          field: 'dateOfBirth',
          error: 'Date of birth not found',
          confidence: frontExtraction.confidence
        });
      }

      if (!frontExtraction.gender) {
        errors.push({
          field: 'gender',
          error: 'Gender not found',
          confidence: frontExtraction.confidence
        });
      }

      if (!frontExtraction.aadhaarNumber) {
        errors.push({
          field: 'aadhaarNumber',
          error: 'Aadhaar number not found',
          confidence: frontExtraction.confidence
        });
      } else if (!AadhaarExtractionUtils.validateAadhaarNumber(frontExtraction.aadhaarNumber)) {
        errors.push({
          field: 'aadhaarNumber',
          error: 'Invalid Aadhaar number format (should be 12 digits)',
          confidence: frontExtraction.confidence
        });
      }

      const success = errors.length === 0;

      return {
        success,
        data: success ? {
          name: frontExtraction.name,
          fatherName: frontExtraction.fatherName,
          dateOfBirth: frontExtraction.dateOfBirth,
          gender: frontExtraction.gender,
          aadhaarNumber: frontExtraction.aadhaarNumber,
          address: '', // Will be filled from back side
          frontPhotoUri: imageUri,
          backPhotoUri: '',
          personPhotoUri: undefined,
          extractionTimestamp: new Date(),
          confidence: frontExtraction.confidence
        } : {
          name: frontExtraction.name,
          fatherName: frontExtraction.fatherName,
          dateOfBirth: frontExtraction.dateOfBirth,
          gender: frontExtraction.gender,
          aadhaarNumber: frontExtraction.aadhaarNumber,
          address: '', // Will be filled from back side
          frontPhotoUri: imageUri,
          backPhotoUri: '',
          personPhotoUri: undefined,
          extractionTimestamp: new Date(),
          confidence: frontExtraction.confidence
        },
        errors: errors.length > 0 ? errors : undefined,
        message: success 
          ? 'Front side extraction successful' 
          : `Extraction completed with ${errors.length} errors`
      };

    } catch (error) {
      console.error('Error in front side extraction:', error);
      console.error('Image URI that caused error:', imageUri);
      
      // Provide more specific error information
      let errorMessage = 'Front side extraction failed';
      if (error instanceof Error) {
        if (error.message.includes('FileNotFoundException') || error.message.includes('ENOENT')) {
          errorMessage = 'Image file not found or inaccessible. Please ensure the photo was captured successfully.';
        } else if (error.message.includes('Permission denied')) {
          errorMessage = 'Permission denied accessing image file. Please check app permissions.';
        } else if (error.message.includes('Google Vision API error')) {
          errorMessage = `Google Vision API error: ${error.message}`;
        } else {
          errorMessage = `Extraction error: ${error.message}`;
        }
      }
      
      return {
        success: false,
        message: errorMessage,
        errors: [{
          field: 'general',
          error: 'Extraction process failed',
          confidence: 0
        }]
      };
    }
  }

  /**
   * Extract data from back side of Aadhaar card
   */
  async extractBackSide(imageUri: string): Promise<OCRResponse> {
    try {
      console.log('Starting back side extraction...');
      console.log('Image URI:', imageUri);
      
      // Validate image URI
      if (!imageUri) {
        return {
          success: false,
          message: 'No image URI provided',
          errors: [{
            field: 'general',
            error: 'Image URI is missing',
            confidence: 0
          }]
        };
      }
      
      // Extract text using Google Vision API
      const ocrResults = await this.googleVisionService.extractTextWithLanguageHints(
        imageUri, 
        ['en', 'hi'] // English and Hindi
      );

      if (ocrResults.length === 0) {
        return {
          success: false,
          message: 'No text found in the image',
          errors: [{
            field: 'general',
            error: 'No text detected',
            confidence: 0
          }]
        };
      }

      console.log(`Found ${ocrResults.length} text blocks`);

      // Extract address data
      const backExtraction = AadhaarExtractionUtils.extractBackSideData(ocrResults);

      // Validate extracted data
      const errors: ExtractionError[] = [];
      
      if (!backExtraction.address) {
        errors.push({
          field: 'address',
          error: 'Address not found',
          confidence: backExtraction.confidence
        });
      }

      const success = errors.length === 0;

      return {
        success,
        data: success ? {
          name: '', // Will be filled from front side
          fatherName: '',
          dateOfBirth: '',
          gender: '',
          aadhaarNumber: '',
          address: backExtraction.address,
          frontPhotoUri: '',
          backPhotoUri: imageUri,
          personPhotoUri: undefined,
          extractionTimestamp: new Date(),
          confidence: backExtraction.confidence
        } : {
          name: '', // Will be filled from front side
          fatherName: '',
          dateOfBirth: '',
          gender: '',
          aadhaarNumber: '',
          address: backExtraction.address,
          frontPhotoUri: '',
          backPhotoUri: imageUri,
          personPhotoUri: undefined,
          extractionTimestamp: new Date(),
          confidence: backExtraction.confidence
        },
        errors: errors.length > 0 ? errors : undefined,
        message: success 
          ? 'Back side extraction successful' 
          : `Extraction completed with ${errors.length} errors`
      };

    } catch (error) {
      console.error('Error in back side extraction:', error);
      console.error('Image URI that caused error:', imageUri);
      
      // Provide more specific error information
      let errorMessage = 'Back side extraction failed';
      if (error instanceof Error) {
        if (error.message.includes('FileNotFoundException') || error.message.includes('ENOENT')) {
          errorMessage = 'Image file not found or inaccessible. Please ensure the photo was captured successfully.';
        } else if (error.message.includes('Permission denied')) {
          errorMessage = 'Permission denied accessing image file. Please check app permissions.';
        } else if (error.message.includes('Google Vision API error')) {
          errorMessage = `Google Vision API error: ${error.message}`;
        } else {
          errorMessage = `Extraction error: ${error.message}`;
        }
      }
      
      return {
        success: false,
        message: errorMessage,
        errors: [{
          field: 'general',
          error: 'Extraction process failed',
          confidence: 0
        }]
      };
    }
  }

  /**
   * Extract complete Aadhaar data from both sides
   */
  async extractCompleteAadhaar(
    frontImageUri: string, 
    backImageUri: string
  ): Promise<OCRResponse> {
    try {
      console.log('Starting complete Aadhaar extraction...');

      // Extract front side
      const frontResponse = await this.extractFrontSide(frontImageUri);
      if (!frontResponse.success) {
        return frontResponse;
      }

      // Extract back side
      const backResponse = await this.extractBackSide(backImageUri);
      if (!backResponse.success) {
        return backResponse;
      }

      // Combine both extractions
      const completeData: AadhaarData = {
        ...frontResponse.data!,
        address: backResponse.data!.address,
        backPhotoUri: backImageUri,
        confidence: (frontResponse.data!.confidence + backResponse.data!.confidence) / 2
      };

      return {
        success: true,
        data: completeData,
        message: 'Complete Aadhaar extraction successful'
      };

    } catch (error) {
      console.error('Error in complete Aadhaar extraction:', error);
      return {
        success: false,
        message: `Complete extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        errors: [{
          field: 'general',
          error: 'Complete extraction process failed',
          confidence: 0
        }]
      };
    }
  }

  /**
   * Get extraction status and progress
   */
  getExtractionStatus(): { isProcessing: boolean; progress: number } {
    // This could be enhanced with actual progress tracking
    return {
      isProcessing: false,
      progress: 0
    };
  }
}

export default AadhaarOCRService;
