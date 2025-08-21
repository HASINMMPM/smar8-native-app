import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Text } from '@/app/common/components/ui';

interface CameraLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  onBackPress?: () => void;
  headerControls?: React.ReactNode;
  showStatusBar?: boolean;
  backgroundColor?: string;
  headerStyle?: any;
}

export default function CameraLayout({
  children,
  showHeader = true,
  headerTitle = 'Camera',
  onBackPress,
  headerControls,
  showStatusBar = true,
  backgroundColor = '#000000',
  headerStyle,
}: CameraLayoutProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {showStatusBar && (
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      )}
      
      {showHeader && (
        <View style={[styles.headerContainer, headerStyle]}>
          <TouchableOpacity onPress={onBackPress} style={styles.closeButton}>
            <Text variant="button" color="textInverse" style={styles.backText}>
              ✕
            </Text>
          </TouchableOpacity>
          
          {headerTitle && (
            <Text variant="h3" color="textInverse" style={styles.headerTitle}>
              {headerTitle}
            </Text>
          )}
          
          <View style={styles.headerControls}>
            {headerControls}
          </View>
        </View>
      )}

      <View style={styles.cameraContainer}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    zIndex: 10,
    backgroundColor: '#000000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 15,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
});
