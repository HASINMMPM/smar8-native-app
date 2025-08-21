import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from './Text';

const { width: screenWidth } = Dimensions.get('window');

interface PopupItem {
  id: string;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  items: PopupItem[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export default function Popup({ visible, onClose, items, position = 'top-right' }: PopupProps) {
  if (!visible) return null;

  const getPositionStyle = () => {
    switch (position) {
      case 'top-right':
        return {
          position: 'absolute' as const,
          top: 140,
          right: 20,
        };
      case 'top-left':
        return {
          position: 'absolute' as const,
          top: 140,
          left: 20,
        };
      case 'bottom-right':
        return {
          position: 'absolute' as const,
          bottom: 20,
          right: 20,
        };
      case 'bottom-left':
        return {
          position: 'absolute' as const,
          bottom: 20,
          left: 20,
        };
      default:
        return {
          position: 'absolute' as const,
          top: 140,
          right: 20,
        };
    }
  };

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      
      {/* Popup Content */}
      <View style={[styles.popup, getPositionStyle()]}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.popupItem,
              index === 0 && styles.firstPopupItem,
              index === items.length - 1 && styles.lastPopupItem,
              item.disabled && styles.disabledPopupItem,
              item.destructive && styles.destructivePopupItem,
            ]}
            onPress={() => {
              if (!item.disabled) {
                item.onPress();
                onClose();
              }
            }}
            disabled={item.disabled}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.popupItemText,
              item.disabled && styles.disabledPopupItemText,
              item.destructive && styles.destructivePopupItemText,
            ].filter(Boolean) as any}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1001,
    minWidth: 200,
    maxWidth: 280,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popupItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    minHeight: 44,
    justifyContent: 'center',
  },
  firstPopupItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastPopupItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  popupItemText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  disabledPopupItem: {
    opacity: 0.5,
  },
  disabledPopupItemText: {
    color: Colors.textTertiary,
  },
  destructivePopupItem: {
    backgroundColor: Colors.error + '08',
  },
  destructivePopupItemText: {
    color: Colors.error,
    fontWeight: '500',
  },
});
