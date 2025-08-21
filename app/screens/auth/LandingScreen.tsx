import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');

const LandingScreen: React.FC = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in animation for logo and content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigate to OnboardingScreen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/screens/auth/OnboardingScreen');
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, logoScaleAnim, router]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primary}
        translucent
      />
      
      {/* Background with multiple layers for depth */}
      <View style={styles.backgroundContainer}>
        {/* Primary background */}
        <View style={[styles.backgroundLayer, { backgroundColor: Colors.primary }]} />
        
        {/* Secondary background layer for depth */}
        <View style={[styles.backgroundLayer, { backgroundColor: Colors.primaryDark }]} />
        
        {/* Blur overlay for softened effect */}
        <BlurView intensity={20} style={styles.blurOverlay}>
          <View style={styles.blurContent} />
        </BlurView>
      </View>
      
      {/* Content Container */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: logoScaleAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.webp')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.tagline}>Welcome to Smar8Connect</Text>
          <Text style={styles.subtitle}>
            Your smart building management solution
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 46, 150, 0.3)',
  },
  blurContent: {
    flex: 1,
    backgroundColor: 'rgba(26, 71, 184, 0.1)',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 200,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textInverse,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textInverse,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
});

export default LandingScreen;
