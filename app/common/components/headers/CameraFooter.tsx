import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CameraFooterProps {
  photoTaken: boolean;
  isCameraReady: boolean;
  onTakePhoto: () => void;
  onRetakePhoto: () => void;
  onContinue: () => void;
  disabled?: boolean; // Optional disabled prop for processing
}

export default function CameraFooter({
  photoTaken,
  isCameraReady,
  onTakePhoto,
  onRetakePhoto,
  onContinue,
  disabled = false, // Default to false for backward compatibility
}: CameraFooterProps) {
  return (
    <View style={styles.bottomTab}>
      {!photoTaken ? (
        <TouchableOpacity 
          onPress={onTakePhoto}
          style={[styles.captureButton, !isCameraReady && styles.captureButtonDisabled]}
          disabled={!isCameraReady}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      ) : (
        <View style={styles.previewButtons}>
          <TouchableOpacity onPress={onRetakePhoto} style={styles.retakeButton}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onContinue} 
            style={[
              styles.continueButton, 
              disabled && styles.continueButtonDisabled
            ]}
            disabled={disabled}
          >
            <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: '#000',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 0,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#333',
  },
  captureButtonDisabled: {
    backgroundColor: '#666',
    borderColor: '#444',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  retakeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  continueButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  buttonTextDisabled: {
    color: '#888',
  },
});
