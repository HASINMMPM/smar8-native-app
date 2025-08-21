import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashMode } from 'expo-camera';

const { width: screenWidth } = Dimensions.get('window');

interface CameraHeaderProps {
  onClose?: () => void;
  onFlashToggle?: () => void;
  onFlipCamera?: () => void;
  onQRCode?: () => void;
  onUpload?: () => void;
  onMoreOptions?: () => void;
  flashMode?: FlashMode;
}

export default function CameraHeader({
  onClose,
  onFlashToggle,
  onFlipCamera,
  onQRCode,
  onUpload,
  onMoreOptions,
  flashMode = 'off'
}: CameraHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Flash Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onFlashToggle}>
        <Ionicons 
          name={flashMode === 'on' ? 'flash' : 'flash-off'} 
          size={24} 
          color="black" 
        />
      </TouchableOpacity>

      {/* Flip Camera Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onFlipCamera}>
        <Ionicons name="camera-reverse" size={24} color="black" />
      </TouchableOpacity>

      {/* QR Code Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onQRCode}>
        <Ionicons name="qr-code" size={24} color="black" />
      </TouchableOpacity>

      {/* Upload Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onUpload}>
        <Ionicons name="cloud-upload" size={24} color="black" />
      </TouchableOpacity>

      {/* More Options Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onMoreOptions}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
