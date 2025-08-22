import { Alert, Button, Input, Text } from '@/app/common/components/ui';
import { Colors } from '@/constants/Colors';
import { API_ENDPOINTS } from '@/constants/api';
import api from '@/utils/api';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Clear previous error messages
    setErrorMessage('');
    setShowError(false);

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      setShowError(true);
      return;
    }

    setIsLoading(true);
    try {
      // Call the login API
      const loginData = {
        email,
        password,
      };

      console.log('Login attempt:', loginData);
      
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
      
      console.log('Login successful:', response);
      
      // Store the auth token if it's returned
      if (response.token) {
        // You can use AsyncStorage here to store the token
        // await AsyncStorage.setItem('authToken', response.token);
        console.log('Auth token received:', response.token);
      }
      
      // Navigate to dashboard on success
      router.replace('/screens/core/DashboardScreen');
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed. Please check your credentials.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/screens/auth/SignUpScreen');
  };



  // const handleBackToOnboarding = () => {
  //   router.push('/screens/auth/OnboardingScreen');
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={handleBackToOnboarding} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity> */}
          
          <Text variant="h1" color="textPrimary" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Sign in to your Smar8 account
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text variant="body" color="textPrimary" style={styles.label}>
              Email
            </Text>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text variant="body" color="textPrimary" style={styles.label}>
              Password
            </Text>
            <View style={styles.passwordContainer}>
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.passwordInput}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={togglePasswordVisibility}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color={Colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text variant="body" color="primary" style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>



          <Button
            title={isLoading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            variant="primary"
            size="large"
            style={styles.loginButton}
            disabled={isLoading}
          />


        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text variant="body" color="textSecondary" style={styles.footerText}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text variant="body" color="primary" style={styles.signUpLink}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Error Alert */}
      <Alert
        visible={showError}
        title="Login Error"
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '600',
  },


});
