import { OCRResult } from '../types/aadhaarTypes';

const GOOGLE_VISION_API_KEY = 'AIzaSyAuPS0yFX9ZBaOVqf5X3EXNLeLxQ6QLnaE';
const GOOGLE_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

export class GoogleVisionService {
  private apiKey: string;

  constructor(apiKey: string = GOOGLE_VISION_API_KEY) {
    this.apiKey = apiKey;
  }

  /**
   * Extract text from image using Google Vision API
   */
  async extractTextFromImage(imageUri: string): Promise<OCRResult[]> {
    try {
      // Convert image to base64
      const base64Image = await this.imageToBase64(imageUri);
      
      // Prepare request payload
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 50
              }
            ]
          }
        ]
      };

      // Make API request
      const response = await fetch(`${GOOGLE_VISION_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Google Vision API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract text annotations
      const textAnnotations = data.responses[0]?.textAnnotations || [];
      
      // Convert to our format
      const results: OCRResult[] = textAnnotations.slice(1).map((annotation: any) => ({
        text: annotation.description,
        confidence: 0.9, // Google Vision doesn't provide confidence scores
        boundingBox: {
          x: annotation.boundingPoly.vertices[0].x,
          y: annotation.boundingPoly.vertices[0].y,
          width: annotation.boundingPoly.vertices[1].x - annotation.boundingPoly.vertices[0].x,
          height: annotation.boundingPoly.vertices[2].y - annotation.boundingPoly.vertices[1].y
        }
      }));

      return results;

    } catch (error) {
      console.error('Error extracting text from image:', error);
      throw error;
    }
  }

  /**
   * Convert image URI to base64 string
   */
  private async imageToBase64(imageUri: string): Promise<string> {
    try {
      console.log('Converting image to base64:', imageUri);
      
      // For React Native, we need to handle file:// and content:// URIs
      if (imageUri.startsWith('file://') || imageUri.startsWith('content://')) {
        // In React Native, we can use expo-file-system to read the file
        const { readAsStringAsync, EncodingType, getInfoAsync } = await import('expo-file-system');
        
        // First check if file exists
        try {
          const fileInfo = await getInfoAsync(imageUri);
          if (!fileInfo.exists) {
            throw new Error(`File does not exist: ${imageUri}`);
          }
          console.log('File exists, size:', fileInfo.size);
        } catch (fileCheckError) {
          console.error('File check failed:', fileCheckError);
          throw new Error(`File access error: ${fileCheckError instanceof Error ? fileCheckError.message : 'Unknown error'}`);
        }
        
        // Try to read the file
        const base64 = await readAsStringAsync(imageUri, {
          encoding: EncodingType.Base64
        });
        
        if (!base64 || base64.length === 0) {
          throw new Error('File is empty or could not be read');
        }
        
        console.log('Successfully converted image to base64, length:', base64.length);
        return base64;
      } else if (imageUri.startsWith('data:')) {
        // Handle data URLs directly
        const base64 = imageUri.split(',')[1];
        if (!base64) {
          throw new Error('Invalid data URL format');
        }
        return base64;
      } else {
        // For network images, we might need to fetch and convert
        const response = await fetch(imageUri);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
        
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    } catch (error) {
      console.error('Error converting image to base64:', error);
      console.error('Image URI was:', imageUri);
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes('FileNotFoundException') || error.message.includes('ENOENT')) {
          throw new Error(`Image file not found or inaccessible. Please ensure the photo was captured successfully. Original error: ${error.message}`);
        } else if (error.message.includes('Permission denied')) {
          throw new Error(`Permission denied accessing image file. Please check app permissions. Original error: ${error.message}`);
        } else {
          throw new Error(`Failed to process image: ${error.message}`);
        }
      } else {
        throw new Error(`Unknown error processing image: ${String(error)}`);
      }
    }
  }

  /**
   * Extract text with specific language hints for better accuracy
   */
  async extractTextWithLanguageHints(imageUri: string, languages: string[] = ['en', 'hi']): Promise<OCRResult[]> {
    try {
      const base64Image = await this.imageToBase64(imageUri);
      
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 50
              }
            ],
            imageContext: {
              languageHints: languages
            }
          }
        ]
      };

      const response = await fetch(`${GOOGLE_VISION_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Google Vision API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const textAnnotations = data.responses[0]?.textAnnotations || [];
      
      const results: OCRResult[] = textAnnotations.slice(1).map((annotation: any) => ({
        text: annotation.description,
        confidence: 0.9,
        boundingBox: {
          x: annotation.boundingPoly.vertices[0].x,
          y: annotation.boundingPoly.vertices[0].y,
          width: annotation.boundingPoly.vertices[1].x - annotation.boundingPoly.vertices[0].x,
          height: annotation.boundingPoly.vertices[2].y - annotation.boundingPoly.vertices[1].y
        }
      }));

      return results;

    } catch (error) {
      console.error('Error extracting text with language hints:', error);
      throw error;
    }
  }
}

export default GoogleVisionService;
