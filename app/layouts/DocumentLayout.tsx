import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from '@/app/common/components/ui/Text';

interface DocumentLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  onBackPress?: (() => void) | undefined;
  headerRight?: React.ReactNode;
  showStatusBar?: boolean;
  backgroundColor?: string;
  contentPadding?: number;
  showScrollView?: boolean;
  bottomSection?: React.ReactNode;
  headerStyle?: any;
  contentStyle?: any;
}

export default function DocumentLayout({
  children,
  showHeader = true,
  headerTitle = 'Document',
  onBackPress,
  headerRight,
  showStatusBar = true,
  backgroundColor = Colors.background,
  contentPadding = 20,
  showScrollView = true,
  bottomSection,
  headerStyle,
  contentStyle,
}: DocumentLayoutProps) {
  const ContentWrapper = showScrollView ? ScrollView : View;
  const contentProps = showScrollView ? { showsVerticalScrollIndicator: false } : {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {showStatusBar && (
        <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      )}
      
      {showHeader && (
        <View style={[styles.header, headerStyle]}>
          <TouchableOpacity 
            onPress={() => {
              if (onBackPress && typeof onBackPress === 'function') {
                onBackPress();
              }
            }} 
            style={styles.backButton}
          >
            <Text variant="button" color="textPrimary" style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>
          
          {headerTitle && (
            <Text variant="h3" color="textPrimary" style={styles.headerTitle}>
              {headerTitle}
            </Text>
          )}
          
          <View style={styles.headerRight}>
            {headerRight}
          </View>
        </View>
      )}

      <ContentWrapper 
        style={[styles.content, { paddingHorizontal: contentPadding }, contentStyle]}
        {...contentProps}
      >
        {children}
      </ContentWrapper>

      {bottomSection && (
        <View style={styles.bottomSection}>
          {bottomSection}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 6,
  },
  backText: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    minWidth: 32,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingTop: 15,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
