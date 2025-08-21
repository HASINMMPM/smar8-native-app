import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import Text from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'outlined',
  size = 'medium',
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = () => {
    const baseStyle: any[] = [styles.input, styles[size], styles[variant]];
    
    if (isFocused) {
      baseStyle.push(styles.focused);
    }
    
    if (error) {
      baseStyle.push(styles.error);
    }
    
    if (leftIcon) {
      baseStyle.push(styles.inputWithLeftIcon);
    }
    
    if (rightIcon) {
      baseStyle.push(styles.inputWithRightIcon);
    }
    
    return baseStyle.filter(Boolean);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" color="textPrimary" style={styles.label}>
          {label}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={getInputStyle()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.textTertiary}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text variant="caption" color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  leftIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  // Size variants
  small: {
    height: 38,
    fontSize: 12,
  },
  medium: {
    height: 42,
    fontSize: 14,
  },
  large: {
    height: 48,
    fontSize: 16,
  },
  // Style variants
  default: {
    borderColor: Colors.border,
  },
  outlined: {
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  filled: {
    borderColor: 'transparent',
    backgroundColor: Colors.backgroundSecondary,
  },
  focused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: 3,
    marginLeft: 3,
  },
});
