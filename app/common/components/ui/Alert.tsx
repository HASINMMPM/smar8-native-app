import { Colors } from '@/constants/Colors';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from './Modal';
import Text from './Text';

const { width: screenWidth } = Dimensions.get('window');

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  style?: any;
}

export default function Alert({
  visible,
  title,
  message,
  buttons = [],
  onClose,
  style,
}: AlertProps) {
  const defaultButtons: AlertButton[] = buttons.length > 0 ? buttons : [
    {
      text: 'OK',
      onPress: () => onClose?.(),
      style: 'default',
    },
  ];

  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButton;
      case 'cancel':
        return styles.cancelButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButtonText;
      case 'cancel':
        return styles.cancelButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose || (() => {})}
      style={[styles.alertContainer, style]}
    >
      <View style={styles.alertContent}>
        <Text variant="h2" style={styles.alertTitle}>
          {title}
        </Text>
        
        {message && (
          <Text variant="body" color="textSecondary" style={styles.alertMessage}>
            {message}
          </Text>
        )}
        
        <View style={styles.buttonContainer}>
          {defaultButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                getButtonStyle(button.style),
                defaultButtons.length === 1 && styles.singleButton,
                index < defaultButtons.length - 1 && styles.buttonWithMargin,
              ]}
              onPress={() => {
                button.onPress();
                onClose?.();
              }}
              activeOpacity={0.7}
            >
              <Text style={getButtonTextStyle(button.style)}>
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    maxWidth: screenWidth * 0.8,
    minWidth: 280,
    backgroundColor: Colors.background,
    borderRadius: 16,
    shadowColor: Colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  alertContent: {
    alignItems: 'center',
  },
  alertTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  alertMessage: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButton: {
    flex: 0,
    minWidth: 80,
  },
  buttonWithMargin: {
    marginRight: 8,
  },
  defaultButton: {
    backgroundColor: Colors.primary,
    minHeight: 44,
    borderRadius: 8,
  },
  defaultButtonText: {
    color: Colors.textInverse,
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
  },
  destructiveButton: {
    backgroundColor: Colors.error,
  },
  destructiveButtonText: {
    color: Colors.textInverse,
    fontWeight: '600',
    fontSize: 16,
  },
});
