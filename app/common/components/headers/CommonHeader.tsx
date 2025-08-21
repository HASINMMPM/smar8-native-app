import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            <Ionicons name="add" size={20} color={Colors.textInverse} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onSearchPress} style={styles.headerButton}>
            <Ionicons name="search" size={20} color={Colors.textInverse} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onMenuPress} style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.textInverse} />
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
            <Ionicons name="arrow-back" size={24} color={Colors.textInverse} />
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
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
    zIndex: 1000,
  },
  
  // 🎯 DASHBOARD HEADER STYLES
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  
  // 🔙 GENERAL HEADER STYLES
  generalHeaderTitle: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  headerButton: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  
  backText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  
  headerSpacer: {
    minWidth: 40,
  },
});
