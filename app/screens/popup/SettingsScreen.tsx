import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button, Divider } from '@/app/common/components/ui';
import { CommonHeader } from '@/app/common/components/headers';
import { Colors } from '@/constants/Colors';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  const handleBackPress = () => {
    router.back();
  };

  const handlePrivacyPress = () => {
    router.push('/screens/popup/PrivacyScreen');
  };

  const handleAboutPress = () => {
    router.push('/screens/popup/AboutScreen');
  };

  const handleHelpSupportPress = () => {
    router.push('/screens/popup/TermsScreen');
  };

  const handleTermsPress = () => {
    router.push('/screens/popup/TermsScreen');
  };

  const handleLogoutPress = () => {
    // TODO: Implement logout functionality
    console.log('Logout pressed');
    router.replace('/screens/auth/LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Settings"
        variant="default"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Settings */}
        <View style={styles.section}>
                                      <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            App Settings
          </Text>
          <Divider />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text variant="body" color="textPrimary">Push Notifications</Text>
              <Text variant="caption" color="textSecondary">Receive alerts and updates</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.textInverse}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text variant="body" color="textPrimary">Dark Mode</Text>
              <Text variant="caption" color="textSecondary">Switch to dark theme</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.textInverse}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text variant="body" color="textPrimary">Biometric Login</Text>
              <Text variant="caption" color="textSecondary">Use fingerprint or face ID</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.textInverse}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text variant="body" color="textPrimary">Auto Sync</Text>
              <Text variant="caption" color="textSecondary">Automatically sync data</Text>
            </View>
            <Switch
              value={autoSyncEnabled}
              onValueChange={setAutoSyncEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.textInverse}
            />
          </View>
        </View>

        {/* Information */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Information
          </Text>
          <Divider />
          
          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPress}>
            <Text variant="body" color="textPrimary">Privacy Policy</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleAboutPress}>
            <Text variant="body" color="textPrimary">About Smar8Manage</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleHelpSupportPress}>
            <Text variant="body" color="textPrimary">Help & Support</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTermsPress}>
            <Text variant="body" color="textPrimary">Terms of Service</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Account
          </Text>
          <Divider />
          
          <Button
            title="Logout"
            variant="secondary"
            size="large"
            onPress={handleLogoutPress}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    marginBottom: 15,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  arrow: {
    fontSize: 18,
    color: Colors.textTertiary,
  },
  logoutButton: {
    marginTop: 10,
  },
  sectionDivider: {
    marginBottom: 15,
  },
});
