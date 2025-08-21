import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from '../ui/Text';

const { width, height } = Dimensions.get('window');

interface DocumentAnalysisProps {
  documentType: string;
  onComplete?: () => void;
  duration?: number;
}

export default function DocumentAnalysis({
  documentType,
  onComplete,
  duration = 3000,
}: DocumentAnalysisProps) {
  const progressValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(progressValue, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(() => {
      onComplete?.();
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [progressValue, scaleValue, duration, onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.iconText}>📄</Text>
        </Animated.View>
        <Text variant="h1" style={styles.title}>
          Processing {documentType}
        </Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          We're extracting information from your {documentType.toLowerCase()}
        </Text>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text variant="body" style={styles.statusText}>
          Analyzing your data...
        </Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingIcon}>⏳</Text>
          <Text variant="body" color="textSecondary" style={styles.loadingText}>
            Please wait...
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    color: '#CCCCCC',
  },
  progressBarContainer: {
    width: width * 0.7,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFFFFF',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingIcon: {
    fontSize: 24,
  },
  loadingText: {
    color: '#CCCCCC',
  },
});
