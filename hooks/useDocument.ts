import { useState, useCallback } from 'react';

export function useDocument() {
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectDocumentType = useCallback((type: string) => {
    setDocumentType(type);
  }, []);
  
  const processDocument = useCallback(() => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  }, []);
  
  return {
    documentType,
    isProcessing,
    selectDocumentType,
    processDocument
  };
}
