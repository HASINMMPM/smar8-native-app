import { CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCamera } from '../../../hooks/useCamera';
import { CameraFooter, CameraHeader } from '../../common/components/headers';

const { width: screenWidth } = Dimensions.get('window');

export default function PhotoCaptureScreen() {
  const router = useRouter();
  const { frontPhotoUri, backPhotoUri } = useLocalSearchParams<{
    frontPhotoUri: string;
    backPhotoUri: string;
  }>();
  const cameraRef = useRef<any>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
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
    router.push('/screens/document/BackScanScreen');
  };

  // Basic photo capture functionality
  const handleTakePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) {
      Alert.alert('Camera not ready', 'Please wait for the camera to initialize.');
      return;
    }

    try {
      console.log('Taking person photo...');
      
      // Take actual photo using the camera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      console.log('Person photo captured:', photo);
      
      // Copy photo to permanent storage
      const permanentUri = `${FileSystem.documentDirectory}aadhaar_person_${Date.now()}.jpg`;
      await FileSystem.copyAsync({
        from: photo.uri,
        to: permanentUri
      });
      
      console.log('Photo saved to permanent location:', permanentUri);
      setPhotoUri(permanentUri);
      setPhotoTaken(true);
      
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const retakePhoto = () => {
    setPhotoTaken(false);
    setPhotoUri(null);
  };

  const continueToReview = () => {
    // Navigate to the new document review screen
    router.push({
      pathname: '/screens/document/DocumentReview',
      params: { 
        frontPhotoUri: frontPhotoUri,
        backPhotoUri: backPhotoUri,
        personPhotoUri: photoUri,
      }
    });
  };

  // Check if we can continue (photo taken)
  const canContinue = photoTaken;

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
              <View style={styles.personFrame} />
              <Text style={styles.overlayText}>Position person within frame</Text>
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
              <Text style={styles.previewText}>Person Photo Captured Successfully!</Text>
            </View>
          </View>
        )}
      </View>

      <CameraFooter
        photoTaken={photoTaken}
        isCameraReady={isCameraReady}
        onTakePhoto={handleTakePhoto}
        onRetakePhoto={retakePhoto}
        onContinue={continueToReview}
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

  content: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personFrame: {
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

  photosSection: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  photoItem: {
    marginRight: 15,
    position: 'relative',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
