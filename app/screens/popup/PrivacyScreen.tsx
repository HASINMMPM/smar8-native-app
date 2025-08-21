import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button, Divider } from '@/app/common/components/ui';
import { CommonHeader } from '@/app/common/components/headers';
import { Colors } from '@/constants/Colors';

export default function PrivacyScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Privacy Policy"
        variant="default"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Data Collection & Usage
        </Text>
        <Divider />
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Smar8Manage collects and processes personal identification documents (ID cards, passports, etc.) 
          to provide secure identity verification and management services. This data is essential for:
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Identity verification and authentication
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Secure access control and authorization
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Compliance with regulatory requirements
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Fraud prevention and security measures
            </Text>
          </View>
        </View>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Data Security
        </Text>
        <Divider />
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          We implement industry-standard security measures to protect your personal information:
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              End-to-end encryption for data transmission
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Secure cloud storage with access controls
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Regular security audits and updates
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Limited access to authorized personnel only
            </Text>
          </View>
        </View>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Data Retention
        </Text>
        <Divider />
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Your identification documents are retained only for as long as necessary to provide our services 
          and comply with legal obligations. We do not sell, rent, or share your personal information 
          with third parties without your explicit consent.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Your Rights
        </Text>
        <Divider />
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          You have the right to:
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Access your personal data
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Request data correction or deletion
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              Withdraw consent at any time
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              File a complaint with regulatory authorities
            </Text>
          </View>
        </View>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Contact Information
        </Text>
        <Divider />
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          For privacy-related questions or concerns, please contact us at:
        </Text>

        <View style={styles.contactInfo}>
          <Text variant="body" color="textPrimary" style={styles.contactLabel}>
            Email:
          </Text>
          <Text variant="body" color="primary" style={styles.contactValue}>
            Contact@Smar8.com
          </Text>
          
          <Text variant="body" color="textPrimary" style={styles.contactLabel}>
            Phone:
          </Text>
          <Text variant="body" color="primary" style={styles.contactValue}>
            +91 9048235416
          </Text>
        </View>

        <Text variant="caption" color="textTertiary" style={styles.lastUpdated}>
          Last updated: August 2024
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  sectionTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontWeight: '600',
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  bulletList: {
    marginBottom: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    lineHeight: 20,
  },
  contactInfo: {
    backgroundColor: Colors.lightBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  contactLabel: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  contactValue: {
    marginBottom: 15,
  },
  lastUpdated: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontStyle: 'italic',
  },
  sectionDivider: {
    marginBottom: 15,
  },
});
