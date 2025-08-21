import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button } from '@/app/common/components/ui';
import { CommonHeader } from '@/app/common/components/headers';
import { Colors } from '@/constants/Colors';
import { 
  Ionicons,
  MaterialIcons 
} from '@expo/vector-icons';

export default function AboutScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="About Smar8Manage"
        variant="default"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>S8</Text>
          </View>
          <Text variant="h1" color="textPrimary" style={styles.appName}>
            Smar8Manage
          </Text>
          <Text variant="caption" color="textSecondary" style={styles.version}>
            Version 1.0.0
          </Text>
        </View>

        {/* What is Smar8Manage */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            What is Smar8Manage?
          </Text>
          
          <Text variant="body" color="textSecondary" style={styles.paragraph}>
            Smar8Manage is a comprehensive identity and document management platform designed to 
            streamline the way organizations handle personal identification, building management, 
            and room allocation processes.
          </Text>
          
          <Text variant="body" color="textSecondary" style={styles.paragraph}>
            Our platform provides secure, efficient, and user-friendly solutions for managing 
            people, properties, and spaces with advanced features for identity verification, 
            access control, and administrative operations.
          </Text>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Key Features
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="people" size={24} color={Colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text variant="body" color="textPrimary" style={styles.featureTitle}>
                  People Management
                </Text>
                <Text variant="caption" color="textSecondary" style={styles.featureDescription}>
                  Comprehensive tenant and user management with identity verification
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="business" size={24} color={Colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text variant="body" color="textPrimary" style={styles.featureTitle}>
                  Building Management
                </Text>
                <Text variant="caption" color="textSecondary" style={styles.featureDescription}>
                  Efficient property and building administration tools
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="home" size={24} color={Colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text variant="body" color="textPrimary" style={styles.featureTitle}>
                  Room Allocation
                </Text>
                <Text variant="caption" color="textSecondary" style={styles.featureDescription}>
                  Smart room booking and space management system
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text variant="body" color="textPrimary" style={styles.featureTitle}>
                  Security & Privacy
                </Text>
                <Text variant="caption" color="textSecondary" style={styles.featureDescription}>
                  Advanced security measures and data protection
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Technology */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Technology
          </Text>
          
          <Text variant="body" color="textSecondary" style={styles.paragraph}>
            Built with modern technologies including React Native, Expo, and secure cloud infrastructure. 
            Our platform ensures data integrity, real-time synchronization, and cross-platform compatibility.
          </Text>
        </View>

        {/* Mission */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Our Mission
          </Text>
          
          <Text variant="body" color="textSecondary" style={styles.paragraph}>
            To simplify and secure identity management processes while providing organizations 
            with powerful tools to manage their people, properties, and spaces efficiently.
          </Text>
        </View>

        {/* Company Info */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Company Information
          </Text>
          
          <View style={styles.companyInfo}>
            <View style={styles.infoRow}>
              <Text variant="body" color="textPrimary" style={styles.infoLabel}>
                Company:
              </Text>
              <Text variant="body" color="textSecondary" style={styles.infoValue}>
                Smar8 Technologies
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="body" color="textPrimary" style={styles.infoLabel}>
                Location:
              </Text>
              <Text variant="body" color="textSecondary" style={styles.infoValue}>
                Calicut, Kerala, India
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text variant="body" color="textPrimary" style={styles.infoLabel}>
                Founded:
              </Text>
              <Text variant="body" color="textSecondary" style={styles.infoValue}>
                2024
              </Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
            Get in Touch
          </Text>
          
          <Text variant="body" color="textSecondary" style={styles.paragraph}>
            Have questions or need support? We're here to help you make the most of Smar8Manage.
          </Text>
          
          <Button
            title="Contact Us"
            variant="primary"
            size="large"
            onPress={() => router.push('/screens/popup/TermsScreen')}
          />
        </View>

        <Text variant="caption" color="textTertiary" style={styles.copyright}>
          © 2024 Smar8 Technologies. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 32,
    color: Colors.textInverse,
    fontWeight: 'bold',
  },
  appName: {
    marginBottom: 5,
    fontWeight: '600',
  },
  version: {
    fontStyle: 'italic',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontWeight: '600',
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  featureDescription: {
    lineHeight: 18,
  },
  companyInfo: {
    backgroundColor: Colors.lightBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontWeight: '600',
  },
  infoValue: {
    fontWeight: '500',
  },
  copyright: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontStyle: 'italic',
  },
});
