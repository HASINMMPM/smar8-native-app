import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simple slow blinking logo animation
    const blinkAnimation = () => {
      Animated.sequence([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1500, // Slow fade in
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0.3,
          duration: 1500, // Slow fade out
          useNativeDriver: true,
        }),
      ]).start(() => blinkAnimation()); // Loop the blinking
    };

    // Start blinking animation
    blinkAnimation();

    // Navigate after 3 seconds
    setTimeout(() => {
      router.replace('/screens/auth/OnboardingScreen');
    }, 3000);
  }, []);

  // Simple blinking logo - clean and elegant

  return (
    <View style={styles.container}>
      {/* Background with Smar8 brand colors */}
      <View style={styles.backgroundGradient}>
        {/* Animated Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
            },
          ]}
        >
          {/* White Building Logo */}
          <View style={styles.buildingLogo}>
            {/* Main Building Structure */}
            <View style={styles.buildingBase} />
            
            {/* Building Windows Row 1 */}
            <View style={styles.windowsRow}>
              <View style={styles.window} />
              <View style={styles.window} />
              <View style={styles.window} />
            </View>
            
            {/* Building Windows Row 2 */}
            <View style={styles.windowsRow}>
              <View style={styles.window} />
              <View style={styles.window} />
              <View style={styles.window} />
            </View>
            
            {/* Building Top */}
            <View style={styles.buildingTop} />
            
            {/* Smar8 Text */}
            <View style={styles.smar8Text}>
              <View style={styles.sText} />
              <View style={styles.marText} />
              <View style={styles.eightText} />
            </View>
          </View>
        </Animated.View>

        {/* No loading dots - just the blinking logo */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  buildingLogo: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buildingBase: {
    width: 90,
    height: 65,
    backgroundColor: Colors.textInverse,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  windowsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 70,
    marginTop: 8,
  },
  window: {
    width: 12,
    height: 12,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  buildingTop: {
    width: 60,
    height: 20,
    backgroundColor: Colors.textInverse,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
  },
  smar8Text: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  sText: {
    width: 8,
    height: 8,
    backgroundColor: Colors.textInverse,
    borderRadius: 4,
  },
  marText: {
    width: 16,
    height: 8,
    backgroundColor: Colors.textInverse,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  eightText: {
    width: 8,
    height: 8,
    backgroundColor: Colors.textInverse,
    borderRadius: 4,
  },
});
