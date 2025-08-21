import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface CommonHeaderProps {
  title: string;
  variant: 'default' | 'dashboard';
  onBackPress?: () => void;
  onAddPress?: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
  rightContent?: React.ReactNode;
  backIcon?: 'arrow' | 'text';
}

export default function CommonHeader({ 
  title, 
  variant,
  onBackPress,
  onAddPress,
  onSearchPress,
  onMenuPress,
  rightContent,
  backIcon = 'arrow',
}: CommonHeaderProps) {
  
  // 🎯 DASHBOARD HEADER SECTION
  if (variant === 'dashboard') {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={onAddPress} style={styles.headerButton}>
            <Ionicons name="add" size={20} color={Colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onSearchPress} style={styles.headerButton}>
            <Ionicons name="search" size={20} color={Colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onMenuPress} style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 🔙 GENERAL HEADER SECTION
  if (variant === 'default') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          {backIcon === 'arrow' ? (
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          ) : (
            <Text style={styles.backText}>←</Text>
          )}
        </TouchableOpacity>
        
        <Text style={styles.generalHeaderTitle}>{title}</Text>
        
        {rightContent ? (
          rightContent
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>
    );
  }

  return null;
}

// 🎨 SHARED STYLES SECTION
const styles = StyleSheet.create({
  // 🏗️ BASE HEADER STYLES (Shared by both)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    zIndex: 1000,
  },
  
  // 🎯 DASHBOARD HEADER STYLES
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  
  // 🔙 GENERAL HEADER STYLES
  generalHeaderTitle: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  headerButton: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  
  backText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  
  headerSpacer: {
    minWidth: 40,
  },
});
