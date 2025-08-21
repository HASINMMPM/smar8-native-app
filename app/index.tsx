import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Directly redirect to WelcomeScreen - no welcome page needed
    router.replace('/screens/auth/WelcomeScreen');
  }, []);

  // Return null since we're redirecting immediately
  return null;
}
