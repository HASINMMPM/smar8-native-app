import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="screens/auth/LandingScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/auth/WelcomeScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/auth/OnboardingScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/auth/LoginScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/auth/SignUpScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/core/DashboardScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/Dashboard/BuildingsScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/Dashboard/RoomsScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/document/DocumentSelectScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/document/FrontScanScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/document/BackScanScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/document/PhotoCaptureScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/document/DocumentReviewScreen" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/SettingsScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/PrivacyScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/ContactUsScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/AboutScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/HelpSupportScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="screens/popup/TermsScreen" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
