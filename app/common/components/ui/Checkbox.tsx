import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Checkbox({
  checked,
  onToggle,
  disabled = false,
  size = 'medium',
}: CheckboxProps) {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        styles[size],
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {checked && (
        <View style={styles.checkmark} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 6,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  checkmark: {
    width: 8,
    height: 8,
    backgroundColor: Colors.textInverse,
    borderRadius: 2,
  },
  // Size variants
  small: {
    width: 18,
    height: 18,
  },
  medium: {
    width: 22,
    height: 22,
  },
  large: {
    width: 26,
    height: 26,
  },
});
