import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export interface AadhaarData {
  aadhaarNumber: string;
  name: string;
  dateOfBirth: string;
  address: string;
  gender?: string;
  photoUri?: string;
}

export interface DocumentAnnotation {
  imageUri: string;
  confidence: number;
}

export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<AadhaarData | null>(null);

  const processDocument = useCallback(async (
    imageUri: string, 
    annotations: DocumentAnnotation
  ): Promise<AadhaarData | null> => {
    setIsProcessing(true);
    
    try {
      // Return empty data structure for manual data entry
      // This can be extended later for other processing methods
      const emptyData: AadhaarData = {
        aadhaarNumber: '',
        name: '',
        dateOfBirth: '',
        address: '',
        gender: '',
        photoUri: imageUri
      };
      
      setExtractedData(emptyData);
      return emptyData;
      
    } catch (error) {
      console.error('Document processing error:', error);
      Alert.alert('Error', 'Failed to process document. Please try again.');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const exportToJSON = useCallback((data: AadhaarData): string => {
    return JSON.stringify(data, null, 2);
  }, []);

  return {
    isProcessing,
    extractedData,
    processDocument,
    exportToJSON
  };
}
