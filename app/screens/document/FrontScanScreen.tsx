import { CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCamera } from '../../../hooks/useCamera';
import { CameraFooter, CameraHeader } from '../../common/components/headers';
import { AadhaarOCRService } from '../../OCR';
import { AadhaarData } from '../../OCR/types/aadhaarTypes';

const { width: screenWidth } = Dimensions.get('window');

export default function FrontScanScreen() {
  const router = useRouter();
  const cameraRef = useRef<any>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<AadhaarData | null>(null);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  
  const aadhaarOCRService = new AadhaarOCRService();
  
  const {
    hasPermission,
    cameraType,
    flashMode,
    isCameraReady,
    toggleCameraType,
    toggleFlash,
    onCameraReady,
  } = useCamera();

  const goBack = () => {
    router.push('/screens/document/DocumentSelectScreen');
  };

  // Photo capture with OCR processing
  const handleTakePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) {
      Alert.alert('Camera not ready', 'Please wait for the camera to initialize.');
      return;
    }

    try {
      console.log('Taking front photo...');
      setIsProcessing(true);
      setExtractionError(null);
      
      // Take actual photo using the camera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      console.log('Front photo captured:', photo);
      
      // Ensure we have a valid photo URI
      if (!photo.uri) {
        throw new Error('Photo capture failed - no URI returned');
      }
      
      // Copy photo to permanent storage with better error handling
      const timestamp = Date.now();
      const permanentUri = `${FileSystem.documentDirectory}aadhaar_front_${timestamp}.jpg`;
      
      console.log('Copying photo from:', photo.uri);
      console.log('Copying photo to:', permanentUri);
      
      try {
        await FileSystem.copyAsync({
          from: photo.uri,
          to: permanentUri
        });
        
        // Verify the file was copied successfully
        const fileInfo = await FileSystem.getInfoAsync(permanentUri);
        if (!fileInfo.exists) {
          throw new Error('File copy failed - destination file does not exist');
        }
        
        console.log('Photo saved to permanent location:', permanentUri);
        console.log('File size:', fileInfo.size, 'bytes');
        
        setPhotoUri(permanentUri);
        setPhotoTaken(true);
        
      } catch (copyError) {
        console.error('Error copying photo to permanent storage:', copyError);
        // Fallback: use the original URI if copy fails
        console.log('Using original photo URI as fallback');
        setPhotoUri(photo.uri);
        setPhotoTaken(true);
      }
      
      // Process OCR extraction
      console.log('Starting OCR extraction...');
      const ocrResponse = await aadhaarOCRService.extractFrontSide(photoUri || permanentUri);
      
      console.log('OCR Response:', ocrResponse);
      
      if (ocrResponse.data) {
        console.log('OCR extraction successful (data available):', ocrResponse.data);
        setExtractedData(ocrResponse.data);
        
        if (!ocrResponse.success) {
          console.log('OCR completed with warnings (minor fields missing):', ocrResponse.message);
          // This is not a critical error - data was extracted
        }
      } else {
        console.log('OCR extraction failed (no data):', ocrResponse.message);
        setExtractionError(ocrResponse.message);
        // Still allow user to continue with manual input
      }
      
    } catch (error) {
      console.error('Error taking photo or processing OCR:', error);
      Alert.alert('Error', 'Failed to take photo or process OCR. Please try again.');
      setExtractionError('OCR processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const retakePhoto = () => {
    setPhotoTaken(false);
    setPhotoUri(null);
  };

  const continueToBackScan = () => {
    console.log('FrontScanScreen - continueToBackScan called');
    console.log('FrontScanScreen - extractedData:', extractedData);
    console.log('FrontScanScreen - photoUri:', photoUri);
    
    // Navigate to back scan screen with front photo only
    // We'll store all data in the review screen directly
    router.push({
      pathname: '/screens/document/BackScanScreen',
      params: { 
        frontPhotoUri: photoUri,
      }
    });
  };

  // Check if we can continue (photo taken and not processing)
  const canContinue = photoTaken && !isProcessing;

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity onPress={goBack} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraHeader
        onClose={goBack}
        onFlashToggle={toggleFlash}
        onFlipCamera={toggleCameraType}
        onQRCode={() => console.log('QR Code pressed')}
        onUpload={() => console.log('Upload pressed')}
        onMoreOptions={() => console.log('More options pressed')}
        flashMode={flashMode}
      />

      <View style={styles.cameraContainer}>
        {!photoTaken ? (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraType}
            flash={flashMode}
            onCameraReady={onCameraReady}
            ratio="4:3"
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.documentFrame} />
              <Text style={styles.overlayText}>Position document front within frame</Text>
            </View>
          </CameraView>
        ) : (
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: photoUri || '' }} 
              style={styles.previewImage}
              resizeMode="contain"
            />
            <View style={styles.previewOverlay}>
              <Text style={styles.previewText}>Front Photo Captured Successfully!</Text>
              {isProcessing && (
                <Text style={styles.processingText}>Processing OCR...</Text>
              )}
              {extractedData && (
                <Text style={styles.successText}>Data extracted successfully!</Text>
              )}
              {extractionError && (
                <Text style={styles.errorText}>OCR failed: {extractionError}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <CameraFooter
        photoTaken={photoTaken}
        isCameraReady={isCameraReady}
        onTakePhoto={handleTakePhoto}
        onRetakePhoto={retakePhoto}
        onContinue={continueToBackScan}
        disabled={!canContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  cameraContainer: {
    flex: 1,
    position: 'relative',
    marginBottom: 0,
  },
  camera: {
    flex: 1,
    marginBottom: 0,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 0,
  },
  documentFrame: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.6,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  previewText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  processingText: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  successText: {
    color: '#90EE90',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  errorText: {
    color: '#FFB6C1',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },

  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
