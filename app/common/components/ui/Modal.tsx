import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal as RNModal,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropColor?: string;
  backdropOpacity?: number;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  style?: any;
}

export default function Modal({
  visible,
  onClose,
  children,
  backdropColor = Colors.overlay,
  backdropOpacity = 0.5,
  animationType = 'fade',
  transparent = true,
  style,
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[
          styles.backdrop,
          { backgroundColor: backdropColor },
          { opacity: backdropOpacity },
        ]}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={[styles.content, style]}
          onPress={(e) => e.stopPropagation()}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.overlay,
  },
  content: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    margin: 20,
    shadowColor: Colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
  },
});
