import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from './Text';

const { width: screenWidth } = Dimensions.get('window');

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClose?: () => void;
  autoFocus?: boolean;
  style?: any;
}

export default function Search({
  placeholder = "Search...",
  value = '',
  onChangeText,
  onClose,
  autoFocus = false,
  style,
}: SearchProps) {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleClose = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.searchInputContainer,
        isActive && styles.activeContainer
      ]}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {(value.length > 0 || isActive) && (
          <TouchableOpacity
            style={styles.searchCloseButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.searchCloseButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 8,
  },
  searchCloseButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchCloseButtonText: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
